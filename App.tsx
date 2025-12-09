
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Medication, Protocol, Procedure, SearchableItem, ItemType, Screen, Dosage, Feedback, AppUpdate } from './types';
import { useFavorites, useLocalStorage } from './hooks';
import { HomeIcon, PillIcon, ClipboardListIcon, SyringeIcon, StarIcon, BackIcon, FlagIcon, ShieldIcon, CheckIcon, TrashIcon, UserIcon, BabyIcon, CalculatorIcon, MoonIcon, SunIcon, HeartPulseIcon, PhoneIcon, RulerIcon, EyeIcon, TableIcon, InfoIcon, AlertTriangleIcon, CrossIcon, BoltIcon, ListIcon, NAV_ITEMS } from './constants';

import { Header } from '@/src/components/layout';
import { DateTimeDisplay, SearchBar, ItemCard, FeedbackModal } from '@/src/components/shared';
import { AdminLogin, AdminPanel } from '@/src/features/admin';
import { HomePage } from '@/src/features/home';
import { AppInfo, ImportantNumbers } from '@/src/features/info';
import { ToolsMenu } from '@/src/features/tools';
import { AdminDataProvider, useAdminData } from '@/src/context/AdminDataContext';

// Algorithm images for CPR
import pedBLSAlgorithm from '@/src/assets/Figure-9-Pediatric-BLS-Algorithm-Single-Rescuer_1765267909433.jpg';
import neonatalAlgorithm from '@/src/assets/Figure-2-Neonatal-Resuscitation_1765267909434.jpg';

// --- APP VERSION CONSTANT ---
const APP_VERSION = '1.6.0';

// --- SMART CPR ASSISTANT COMPONENT (Enhanced with Event Logging - AHA 2025) ---
type PatientType = 'adult' | 'child' | 'neonate';
type RhythmType = 'vf_pvt' | 'asystole_pea' | null;
type CPRView = 'main' | 'settings' | 'algorithms';

interface CPREvent {
    id: string;
    type: 'shock' | 'epinephrine' | 'amiodarone' | 'lidocaine' | 'atropine' | 'adenosine' | 'calcium' | 'bicarb' | 'rhythm_check' | 'rosc' | 'note';
    timestamp: number;
    elapsedSeconds: number;
    details?: string;
    dose?: string;
}

interface SmartCPRAssistantProps {
    onSelectItem: (item: SearchableItem) => void;
    allDataMap: Map<string, SearchableItem>;
}

const SmartCPRAssistant: React.FC<SmartCPRAssistantProps> = ({ onSelectItem, allDataMap }) => {
    // No gatekeeping - start with null patient type, user can set later
    const [patientType, setPatientType] = useState<PatientType | null>(null);
    const [rhythmType, setRhythmType] = useState<RhythmType>(null);
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState(0);
    const [cycleTime, setCycleTime] = useState(0);
    const [metronomeOn, setMetronomeOn] = useState(false);
    const [showCauses, setShowCauses] = useState(false);
    const [showLog, setShowLog] = useState(false);
    const [showDrugsMenu, setShowDrugsMenu] = useState(false);
    const [currentView, setCurrentView] = useState<CPRView>('main');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<'ped' | 'neo' | null>(null);
    
    // Event Log - timestamps all actions
    const [eventLog, setEventLog] = useState<CPREvent[]>([]);
    
    // Weight for Pediatric Calculations
    const [pedWeight, setPedWeight] = useState<number>(20);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const nextNoteTimeRef = useRef(0);
    const timerIDRef = useRef<number | null>(null);

    // AHA 2025 Constants
    const config = useMemo(() => {
        switch(patientType) {
            case 'adult':
                return {
                    label: 'מבוגר',
                    ratio: '30:2',
                    cycleSec: 120,
                    shockEnergy: '200 J (ביפאזי)',
                    shockEnergy2: '200-360 J',
                    epiDose: '1 מ"ג IV/IO',
                    amioDose1: '300 מ"ג',
                    amioDose2: '150 מ"ג',
                    lidoDose1: '1-1.5 מ"ג/ק"ג',
                    lidoDose2: '0.5-0.75 מ"ג/ק"ג',
                    atropineDose: '1 מ"ג (מקס 3 מ"ג)',
                    adenosineDose1: '6 מ"ג IV מהיר',
                    adenosineDose2: '12 מ"ג IV מהיר',
                    calciumDose: '1-2 גרם (CaCl)',
                    bicarbDose: '1 mEq/kg',
                    rate: 110
                };
            case 'child':
                return {
                    label: 'ילד / תינוק',
                    ratio: '15:2 (זוג) / 30:2 (יחיד)',
                    cycleSec: 120,
                    shockEnergy: '2 J/kg',
                    shockEnergy2: '4 J/kg (מקס 10 J/kg)',
                    epiDose: '0.01 מ"ג/ק"ג (מקס 1 מ"ג)',
                    amioDose1: '5 מ"ג/ק"ג (מקס 300 מ"ג)',
                    amioDose2: '5 מ"ג/ק"ג (מקס 150 מ"ג)',
                    lidoDose1: '1 מ"ג/ק"ג',
                    lidoDose2: '1 מ"ג/ק"ג',
                    atropineDose: '0.02 מ"ג/ק"ג (מינ 0.1, מקס 0.5)',
                    adenosineDose1: '0.1 מ"ג/ק"ג (מקס 6 מ"ג)',
                    adenosineDose2: '0.2 מ"ג/ק"ג (מקס 12 מ"ג)',
                    calciumDose: '20 מ"ג/ק"ג CaCl',
                    bicarbDose: '1 mEq/kg',
                    rate: 110
                };
            case 'neonate':
                return {
                    label: 'יילוד (NRP)',
                    ratio: '3:1',
                    cycleSec: 60,
                    shockEnergy: 'נדיר',
                    shockEnergy2: 'נדיר',
                    epiDose: '0.01-0.03 מ"ג/ק"ג',
                    amioDose1: '-',
                    amioDose2: '-',
                    lidoDose1: '-',
                    lidoDose2: '-',
                    atropineDose: '-',
                    adenosineDose1: '-',
                    adenosineDose2: '-',
                    calciumDose: '-',
                    bicarbDose: '-',
                    rate: 120
                };
            default: return null;
        }
    }, [patientType]);

    // Calculate counts from event log
    const shockCount = eventLog.filter(e => e.type === 'shock').length;
    const epiCount = eventLog.filter(e => e.type === 'epinephrine').length;
    const amioCount = eventLog.filter(e => e.type === 'amiodarone').length;
    const lidoCount = eventLog.filter(e => e.type === 'lidocaine').length;
    
    // Pediatric dose calculator - calculates actual dose with weight
    const calcPedDose = (mgPerKg: number, maxMg?: number, unit: string = 'מ"ג') => {
        if (patientType !== 'child') return null;
        const calculated = pedWeight * mgPerKg;
        const final = maxMg ? Math.min(calculated, maxMg) : calculated;
        return `${final.toFixed(1)} ${unit} (${mgPerKg}${unit}/kg × ${pedWeight}kg${maxMg && calculated > maxMg ? `, מקס ${maxMg}` : ''})`;
    };
    
    // Calculate actual doses for pediatric patients
    const pedDoses = useMemo(() => {
        if (patientType !== 'child') return null;
        return {
            epi: calcPedDose(0.01, 1),
            shock1: `${(pedWeight * 2).toFixed(0)} J (2 J/kg × ${pedWeight}kg)`,
            shock2: `${(pedWeight * 4).toFixed(0)} J (4 J/kg × ${pedWeight}kg, מקס ${Math.min(pedWeight * 10, 360)}J)`,
            amio1: calcPedDose(5, 300),
            amio2: calcPedDose(5, 150),
            lido1: calcPedDose(1),
            lido2: calcPedDose(1),
            atropine: `${Math.min(Math.max(pedWeight * 0.02, 0.1), 0.5).toFixed(2)} מ"ג (0.02mg/kg, מינ 0.1, מקס 0.5)`,
            adenosine1: calcPedDose(0.1, 6),
            adenosine2: calcPedDose(0.2, 12),
            calcium: calcPedDose(20, undefined, 'מ"ג CaCl'),
            bicarb: `${pedWeight.toFixed(0)} mEq (1 mEq/kg × ${pedWeight}kg)`
        };
    }, [patientType, pedWeight]);
    
    // Get last epinephrine time
    const lastEpiEvent = eventLog.filter(e => e.type === 'epinephrine').slice(-1)[0];
    const lastEpiTime = lastEpiEvent?.timestamp || null;
    const timeSinceEpi = lastEpiTime ? Math.floor((Date.now() - lastEpiTime) / 1000) : 0;
    const epiAlertLevel = timeSinceEpi >= 300 ? 'bg-red-600 animate-pulse' : timeSinceEpi >= 180 ? 'bg-yellow-500' : 'bg-slate-100 dark:bg-slate-700';

    // Add event to log
    const addEvent = (type: CPREvent['type'], details?: string, dose?: string) => {
        const now = Date.now();
        const elapsedSec = startTime ? Math.floor((now - startTime) / 1000) : 0;
        const newEvent: CPREvent = {
            id: `${now}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            timestamp: now,
            elapsedSeconds: elapsedSec,
            details,
            dose
        };
        setEventLog(prev => [...prev, newEvent]);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isActive) {
            if (!startTime) setStartTime(Date.now());
            interval = setInterval(() => {
                const now = Date.now();
                setElapsed(Math.floor((now - (startTime || now)) / 1000));
                setCycleTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime]);

    // Metronome Logic
    const playClick = () => {
        if (!audioCtxRef.current) return;
        const osc = audioCtxRef.current.createOscillator();
        const gainNode = audioCtxRef.current.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);
        osc.frequency.value = 1000;
        gainNode.gain.value = 0.5;
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.1);
    };

    const scheduler = () => {
        if (!audioCtxRef.current) return;
        const bpm = activeConfig?.rate || 110;
        while (nextNoteTimeRef.current < audioCtxRef.current.currentTime + 0.1) {
            playClick();
            nextNoteTimeRef.current += 60.0 / bpm;
        }
        timerIDRef.current = window.setTimeout(scheduler, 25);
    };

    const toggleMetronome = () => {
        if (metronomeOn) {
            window.clearTimeout(timerIDRef.current!);
            setMetronomeOn(false);
        } else {
            if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
            nextNoteTimeRef.current = audioCtxRef.current.currentTime;
            scheduler();
            setMetronomeOn(true);
        }
    };

    useEffect(() => {
        return () => {
            if (timerIDRef.current) window.clearTimeout(timerIDRef.current);
            if (audioCtxRef.current) audioCtxRef.current.close();
        };
    }, []);

    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const getEventLabel = (type: CPREvent['type']) => {
        const labels: Record<CPREvent['type'], string> = {
            shock: 'שוק חשמלי',
            epinephrine: 'אדרנלין',
            amiodarone: 'אמיודרון',
            lidocaine: 'לידוקאין',
            atropine: 'אטרופין',
            adenosine: 'אדנוזין',
            calcium: 'סידן',
            bicarb: 'ביקרבונט',
            rhythm_check: 'בדיקת קצב',
            rosc: 'ROSC',
            note: 'הערה'
        };
        return labels[type];
    };

    const getEventColor = (type: CPREvent['type']) => {
        const colors: Record<CPREvent['type'], string> = {
            shock: 'bg-yellow-500',
            epinephrine: 'bg-red-500',
            amiodarone: 'bg-purple-500',
            lidocaine: 'bg-indigo-500',
            atropine: 'bg-green-500',
            adenosine: 'bg-pink-500',
            calcium: 'bg-orange-500',
            bicarb: 'bg-cyan-500',
            rhythm_check: 'bg-blue-500',
            rosc: 'bg-green-600',
            note: 'bg-slate-500'
        };
        return colors[type];
    };

    const reset = () => {
        setIsActive(false);
        setStartTime(null);
        setElapsed(0);
        setCycleTime(0);
        setMetronomeOn(false);
        setPatientType(null);
        setRhythmType(null);
        setEventLog([]);
        setShowLog(false);
        setShowDrugsMenu(false);
        setCurrentView('main');
        setSelectedAlgorithm(null);
        if (timerIDRef.current) window.clearTimeout(timerIDRef.current);
    };

    // Smart recommendations based on AHA 2025
    const getRecommendation = () => {
        if (!isActive || !rhythmType) return null;
        
        if (rhythmType === 'vf_pvt') {
            if (shockCount === 0) return { text: 'בצע שוק ראשון!', color: 'bg-yellow-500', urgent: true };
            if (shockCount >= 1 && epiCount === 0) return { text: 'תן אדרנלין לאחר שוק 2', color: 'bg-red-500', urgent: shockCount >= 2 };
            if (shockCount >= 3 && amioCount === 0 && lidoCount === 0) return { text: 'שקול אמיודרון/לידוקאין', color: 'bg-purple-500', urgent: true };
            if (timeSinceEpi >= 180) return { text: 'זמן לאדרנלין! (3-5 דק\')', color: 'bg-red-500', urgent: timeSinceEpi >= 300 };
        } else {
            if (epiCount === 0) return { text: 'תן אדרנלין מיידית!', color: 'bg-red-500', urgent: true };
            if (timeSinceEpi >= 180) return { text: 'זמן לאדרנלין! (3-5 דק\')', color: 'bg-red-500', urgent: timeSinceEpi >= 300 };
        }
        return null;
    };

    const recommendation = getRecommendation();

    // Default config for when no patient type selected - use full adult defaults
    const defaultConfig = {
        label: 'כללי',
        ratio: '30:2',
        cycleSec: 120,
        shockEnergy: '200 J (ביפאזי)',
        shockEnergy2: '200-360 J',
        epiDose: '1 מ"ג IV/IO',
        amioDose1: '300 מ"ג',
        amioDose2: '150 מ"ג',
        lidoDose1: '1-1.5 מ"ג/ק"ג',
        lidoDose2: '0.5-0.75 מ"ג/ק"ג',
        atropineDose: '1 מ"ג (מקס 3 מ"ג)',
        adenosineDose1: '6 מ"ג IV מהיר',
        adenosineDose2: '12 מ"ג IV מהיר',
        calciumDose: '1-2 גרם (CaCl)',
        bicarbDose: '1 mEq/kg',
        rate: 110
    };
    
    const activeConfig = config || defaultConfig;

    // Algorithm View
    if (currentView === 'algorithms') {
        return (
            <div className="p-4 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => { setCurrentView('main'); setSelectedAlgorithm(null); }} className="text-slate-500 dark:text-slate-400">
                        <BackIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">אלגוריתמי החייאה</h1>
                    <div className="w-6"></div>
                </div>
                
                {!selectedAlgorithm ? (
                    <div className="grid grid-cols-1 gap-4">
                        <button 
                            onClick={() => setSelectedAlgorithm('ped')}
                            className="p-6 bg-uh-orange text-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 hover:bg-orange-600 transition-all"
                        >
                            <div className="flex gap-2"><UserIcon className="w-10 h-10" /><BabyIcon className="w-8 h-8" /></div>
                            <span className="text-xl font-bold">Pediatric BLS</span>
                            <span className="text-sm opacity-90">AHA 2025 - Single Rescuer</span>
                        </button>
                        <button 
                            onClick={() => setSelectedAlgorithm('neo')}
                            className="p-6 bg-uh-purple text-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 hover:bg-purple-600 transition-all"
                        >
                            <BabyIcon className="w-12 h-12" />
                            <span className="text-xl font-bold">Neonatal Resuscitation</span>
                            <span className="text-sm opacity-90">AHA 2025 - NRP Algorithm</span>
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <button 
                            onClick={() => setSelectedAlgorithm(null)}
                            className="text-uh-blue font-bold text-sm flex items-center gap-1"
                        >
                            <BackIcon className="w-4 h-4" /> חזרה לרשימה
                        </button>
                        <div className="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src={selectedAlgorithm === 'ped' ? pedBLSAlgorithm : neonatalAlgorithm}
                                alt={selectedAlgorithm === 'ped' ? 'Pediatric BLS Algorithm' : 'Neonatal Resuscitation Algorithm'}
                                className="w-full h-auto"
                            />
                        </div>
                        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                            {selectedAlgorithm === 'ped' ? 'Pediatric Basic Life Support - Single Rescuer' : 'Neonatal Resuscitation Algorithm'}
                            <br/>AHA 2025
                        </p>
                    </div>
                )}
            </div>
        );
    }

    // Settings View
    if (currentView === 'settings') {
        return (
            <div className="p-4 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentView('main')} className="text-slate-500 dark:text-slate-400">
                        <BackIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">הגדרות מתקדמות</h1>
                    <div className="w-6"></div>
                </div>
                
                <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow border border-slate-200 dark:border-slate-700">
                    <label className="block font-bold text-slate-700 dark:text-slate-200 mb-3">סוג מטופל (אופציונלי)</label>
                    <div className="grid grid-cols-3 gap-2">
                        <button 
                            onClick={() => setPatientType('adult')}
                            className={`p-3 rounded-xl text-sm font-bold transition-all ${patientType === 'adult' ? 'bg-uh-blue text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                        >
                            <UserIcon className="w-6 h-6 mx-auto mb-1" />
                            מבוגר
                        </button>
                        <button 
                            onClick={() => setPatientType('child')}
                            className={`p-3 rounded-xl text-sm font-bold transition-all ${patientType === 'child' ? 'bg-uh-orange text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                        >
                            <BabyIcon className="w-6 h-6 mx-auto mb-1" />
                            ילד
                        </button>
                        <button 
                            onClick={() => { setPatientType('neonate'); setRhythmType('asystole_pea'); }}
                            className={`p-3 rounded-xl text-sm font-bold transition-all ${patientType === 'neonate' ? 'bg-uh-purple text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                        >
                            <BabyIcon className="w-6 h-6 mx-auto mb-1" />
                            יילוד
                        </button>
                    </div>
                    {patientType && (
                        <button onClick={() => { setPatientType(null); setRhythmType(null); }} className="text-sm text-red-500 mt-2">נקה בחירה</button>
                    )}
                </div>
                
                {/* Weight input for pediatrics */}
                {patientType === 'child' && (
                    <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow border border-slate-200 dark:border-slate-700">
                        <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">משקל המטופל (ק"ג)</label>
                        <input 
                            type="number" 
                            value={pedWeight} 
                            onChange={(e) => setPedWeight(Number(e.target.value) || 20)}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-center text-2xl font-bold dark:text-white"
                            min={1} max={100}
                        />
                    </div>
                )}
                
                {/* Rhythm type for non-neonates */}
                {patientType && patientType !== 'neonate' && (
                    <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow border border-slate-200 dark:border-slate-700">
                        <label className="block font-bold text-slate-700 dark:text-slate-200 mb-3">קצב (אופציונלי)</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button 
                                onClick={() => setRhythmType('vf_pvt')}
                                className={`p-3 rounded-xl text-sm font-bold transition-all ${rhythmType === 'vf_pvt' ? 'bg-yellow-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                            >
                                <BoltIcon className="w-6 h-6 mx-auto mb-1" />
                                VF/pVT
                            </button>
                            <button 
                                onClick={() => setRhythmType('asystole_pea')}
                                className={`p-3 rounded-xl text-sm font-bold transition-all ${rhythmType === 'asystole_pea' ? 'bg-slate-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                            >
                                <HeartPulseIcon className="w-6 h-6 mx-auto mb-1" />
                                Asystole/PEA
                            </button>
                        </div>
                        {rhythmType && (
                            <button onClick={() => setRhythmType(null)} className="text-sm text-red-500 mt-2">נקה בחירה</button>
                        )}
                    </div>
                )}
                
                <button 
                    onClick={() => setCurrentView('main')}
                    className="w-full py-3 bg-uh-green text-white rounded-xl font-bold text-lg shadow-md"
                >
                    חזור להחייאה
                </button>
            </div>
        );
    }

    // Main CPR View - always accessible
    return (
        <div className="p-4 space-y-3 animate-fade-in text-center pb-24">
            {/* Algorithms Button */}
            <button 
                onClick={() => setCurrentView('algorithms')}
                className="w-full py-2 px-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold flex items-center justify-center gap-2 mb-2"
            >
                <TableIcon className="w-4 h-4" />
                אלגוריתמים
            </button>

            {/* Always Expanded Settings Panel */}
            <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow border border-slate-200 dark:border-slate-700 animate-fade-in">
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-3">סוג מטופל (אופציונלי)</label>
                <div className="grid grid-cols-3 gap-2">
                    <button 
                        onClick={() => setPatientType('adult')}
                        className={`p-3 rounded-xl text-sm font-bold transition-all ${patientType === 'adult' ? 'bg-uh-blue text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                    >
                        <UserIcon className="w-6 h-6 mx-auto mb-1" />
                        מבוגר
                    </button>
                    <button 
                        onClick={() => setPatientType('child')}
                        className={`p-3 rounded-xl text-sm font-bold transition-all ${patientType === 'child' ? 'bg-uh-orange text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                    >
                        <BabyIcon className="w-6 h-6 mx-auto mb-1" />
                        ילד
                    </button>
                    <button 
                        onClick={() => { setPatientType('neonate'); setRhythmType('asystole_pea'); }}
                        className={`p-3 rounded-xl text-sm font-bold transition-all ${patientType === 'neonate' ? 'bg-uh-purple text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                    >
                        <BabyIcon className="w-6 h-6 mx-auto mb-1" />
                        יילוד
                    </button>
                </div>
                {patientType && (
                    <button onClick={() => { setPatientType(null); setRhythmType(null); }} className="text-sm text-red-500 mt-2">נקה בחירה</button>
                )}

                {/* Weight input for pediatrics */}
                {patientType === 'child' && (
                    <div className="mt-3">
                        <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">משקל המטופל (ק"ג)</label>
                        <input 
                            type="number" 
                            value={pedWeight} 
                            onChange={(e) => setPedWeight(Number(e.target.value) || 20)}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-center text-2xl font-bold dark:text-white"
                            min={1} max={100}
                        />
                    </div>
                )}

                {/* Rhythm type for non-neonates */}
                {patientType && patientType !== 'neonate' && (
                    <div className="mt-3">
                        <label className="block font-bold text-slate-700 dark:text-slate-200 mb-3">קצב (אופציונלי)</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button 
                                onClick={() => setRhythmType('vf_pvt')}
                                className={`p-3 rounded-xl text-sm font-bold transition-all ${rhythmType === 'vf_pvt' ? 'bg-yellow-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                            >
                                <BoltIcon className="w-6 h-6 mx-auto mb-1" />
                                VF/pVT
                            </button>
                            <button 
                                onClick={() => setRhythmType('asystole_pea')}
                                className={`p-3 rounded-xl text-sm font-bold transition-all ${rhythmType === 'asystole_pea' ? 'bg-slate-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                            >
                                <HeartPulseIcon className="w-6 h-6 mx-auto mb-1" />
                                Asystole/PEA
                            </button>
                        </div>
                        {rhythmType && (
                            <button onClick={() => setRhythmType(null)} className="text-sm text-red-500 mt-2">נקה בחירה</button>
                        )}
                    </div>
                )}
            </div>

            {/* Top Bar: Time & Protocol */}
            <div className="flex justify-between items-center bg-slate-200 dark:bg-slate-800 p-3 rounded-xl">
                <div className="flex flex-col items-start">
                    <span className="text-xs text-slate-500 dark:text-slate-300">זמן כולל</span>
                    <span className="text-2xl font-mono font-bold text-slate-800 dark:text-white">{formatTime(elapsed)}</span>
                </div>
                <div className="text-center">
                    {rhythmType ? (
                        <span className={`text-xs px-2 py-1 rounded font-bold ${rhythmType === 'vf_pvt' ? 'bg-yellow-500 text-white' : 'bg-slate-600 text-white'}`}>
                            {rhythmType === 'vf_pvt' ? 'VF/pVT' : 'Asystole/PEA'}
                        </span>
                    ) : (
                        <span className="text-xs px-2 py-1 rounded font-bold bg-slate-400 text-white">לא נבחר קצב</span>
                    )}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-500 dark:text-slate-300">פרוטוקול</span>
                    <span className="font-bold text-uh-blue dark:text-blue-400">{activeConfig.label}</span>
                </div>
            </div>

            {/* Smart Recommendation Banner */}
            {recommendation && (
                <div className={`${recommendation.color} ${recommendation.urgent ? 'animate-pulse' : ''} text-white p-3 rounded-xl font-bold text-lg shadow-lg`}>
                    {recommendation.text}
                </div>
            )}

            {/* Cycle Timer */}
            <div className={`bg-white dark:bg-dark-card rounded-2xl p-4 shadow-xl border-2 ${cycleTime > (activeConfig.cycleSec || 120) ? 'border-red-500 animate-pulse' : 'border-slate-200 dark:border-slate-700'}`}>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">מחזור CPR</span>
                    <span className="font-mono font-bold text-3xl text-slate-800 dark:text-white">{formatTime(cycleTime)}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-1000 ${cycleTime > ((activeConfig.cycleSec || 120) - 10) ? 'bg-red-500' : 'bg-uh-green'}`} 
                        style={{ width: `${Math.min((cycleTime / (activeConfig.cycleSec || 120)) * 100, 100)}%` }}
                    ></div>
                </div>
                <div className="mt-3 flex gap-2">
                    {!isActive ? (
                        <button onClick={() => { setIsActive(true); addEvent('note', 'התחלת החייאה'); }} className="flex-1 bg-uh-green text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-green-600">
                            התחל החייאה
                        </button>
                    ) : (
                        <button onClick={() => { setCycleTime(0); addEvent('rhythm_check'); }} className="flex-1 bg-uh-blue text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-blue-600">
                            בדיקת קצב (אפס מחזור)
                        </button>
                    )}
                </div>
            </div>

            {/* Metronome */}
            <button 
                onClick={toggleMetronome} 
                className={`w-full py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm border ${metronomeOn ? 'bg-slate-800 text-white animate-pulse border-transparent' : 'bg-white dark:bg-dark-card text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
            >
                <HeartPulseIcon className="w-5 h-5" />
                {metronomeOn ? `מטרונום: ${activeConfig.rate}/דק'` : 'הפעל מטרונום'}
            </button>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
                {/* Shock Button - only for VF/pVT */}
                {rhythmType === 'vf_pvt' && (
                    <button 
                        onClick={() => { 
                            const shockNum = shockCount + 1;
                            const energy = patientType === 'child' 
                                ? (shockNum === 1 ? pedDoses?.shock1 : pedDoses?.shock2)
                                : (shockNum === 1 ? activeConfig.shockEnergy : activeConfig.shockEnergy2);
                            addEvent('shock', `שוק #${shockNum}`, energy); 
                            setCycleTime(0); 
                        }}
                        className="bg-uh-yellow text-slate-900 p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                    >
                        <BoltIcon className="w-8 h-8" />
                        <span className="font-bold text-lg">שוק חשמלי</span>
                        <span className="text-xs font-semibold opacity-75">
                            {patientType === 'child' 
                                ? (shockCount === 0 ? pedDoses?.shock1 : pedDoses?.shock2)
                                : (shockCount === 0 ? activeConfig.shockEnergy : activeConfig.shockEnergy2)}
                        </span>
                        {shockCount > 0 && <span className="bg-black/10 px-2 rounded-full text-xs mt-1">#{shockCount}</span>}
                    </button>
                )}

                {/* Epinephrine Button */}
                <button 
                    onClick={() => { 
                        const dose = patientType === 'child' ? pedDoses?.epi : activeConfig.epiDose;
                        addEvent('epinephrine', `מנה #${epiCount + 1}`, dose || ''); 
                    }}
                    className={`${lastEpiTime && isActive ? epiAlertLevel : 'bg-white dark:bg-dark-card'} text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform relative overflow-hidden`}
                >
                    <SyringeIcon className="w-8 h-8 text-uh-red" />
                    <span className="font-bold text-lg">אדרנלין</span>
                    <span className="text-xs font-semibold opacity-75">
                        {patientType === 'child' ? pedDoses?.epi : activeConfig.epiDose}
                    </span>
                    {lastEpiTime && isActive && (
                        <div className="text-xs font-mono font-bold mt-1 bg-white/50 dark:bg-black/50 px-2 rounded">
                            לפני: {formatTime(timeSinceEpi)}
                        </div>
                    )}
                    {epiCount > 0 && <span className="absolute top-2 right-2 bg-slate-200 dark:bg-slate-700 text-xs px-1.5 rounded-full">{epiCount}</span>}
                </button>

                {/* Amiodarone/Lidocaine - only for VF/pVT */}
                {rhythmType === 'vf_pvt' && patientType !== 'neonate' && (
                    <button 
                        onClick={() => {
                            const doseNum = amioCount + 1;
                            const dose = patientType === 'child'
                                ? (doseNum === 1 ? pedDoses?.amio1 : pedDoses?.amio2)
                                : (doseNum === 1 ? activeConfig.amioDose1 : activeConfig.amioDose2);
                            addEvent('amiodarone', `מנה #${doseNum}`, dose || '');
                        }}
                        className="bg-white dark:bg-dark-card text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                    >
                        <PillIcon className="w-8 h-8 text-uh-purple" />
                        <span className="font-bold text-lg">אמיודרון</span>
                        <span className="text-xs font-semibold opacity-75">
                            {patientType === 'child' 
                                ? (amioCount === 0 ? pedDoses?.amio1 : pedDoses?.amio2)
                                : (amioCount === 0 ? activeConfig.amioDose1 : activeConfig.amioDose2)}
                        </span>
                        {amioCount > 0 && <span className="bg-purple-100 dark:bg-purple-900 px-2 rounded-full text-xs mt-1">#{amioCount}</span>}
                    </button>
                )}

                {/* More Drugs Menu */}
                {patientType !== 'neonate' && (
                    <button 
                        onClick={() => setShowDrugsMenu(!showDrugsMenu)}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                    >
                        <PillIcon className="w-8 h-8" />
                        <span className="font-bold text-lg">תרופות נוספות</span>
                        <span className="text-xs font-semibold opacity-75">לידוקאין, אטרופין...</span>
                    </button>
                )}

                {/* H's & T's */}
                <button 
                    onClick={() => setShowCauses(!showCauses)}
                    className="bg-blue-50 dark:bg-blue-900/20 text-uh-blue border border-blue-200 dark:border-blue-800 p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                >
                    <ListIcon className="w-8 h-8" />
                    <span className="font-bold text-lg">H's & T's</span>
                    <span className="text-xs font-semibold opacity-75">גורמים הפיכים</span>
                </button>

                {/* Event Log Button */}
                <button 
                    onClick={() => setShowLog(!showLog)}
                    className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                >
                    <ClipboardListIcon className="w-8 h-8" />
                    <span className="font-bold text-lg">לוג אירועים</span>
                    <span className="text-xs font-semibold opacity-75">{eventLog.length} רשומות</span>
                </button>
            </div>

            {/* Additional Drugs Menu */}
            {showDrugsMenu && (
                <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 text-right animate-fade-in">
                    <h3 className="font-bold text-lg border-b pb-2 mb-3 dark:text-white text-center">תרופות נוספות (AHA 2025)</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {/* Lidocaine */}
                        <button 
                            onClick={() => {
                                const doseNum = lidoCount + 1;
                                const dose = patientType === 'child'
                                    ? (doseNum === 1 ? pedDoses?.lido1 : pedDoses?.lido2)
                                    : (doseNum === 1 ? activeConfig.lidoDose1 : activeConfig.lidoDose2);
                                addEvent('lidocaine', `מנה #${doseNum}`, dose || '');
                                setShowDrugsMenu(false);
                            }}
                            className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-bold"
                        >
                            לידוקאין<br/><span className="text-xs opacity-75">
                                {patientType === 'child' ? pedDoses?.lido1 : activeConfig.lidoDose1}
                            </span>
                        </button>
                        
                        {/* Atropine */}
                        <button 
                            onClick={() => {
                                const dose = patientType === 'child' ? pedDoses?.atropine : activeConfig.atropineDose;
                                addEvent('atropine', 'לברדיקרדיה', dose || '');
                                setShowDrugsMenu(false);
                            }}
                            className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-bold"
                        >
                            אטרופין<br/><span className="text-xs opacity-75">
                                {patientType === 'child' ? pedDoses?.atropine : activeConfig.atropineDose}
                            </span>
                        </button>
                        
                        {/* Adenosine */}
                        <button 
                            onClick={() => {
                                const adenoCount = eventLog.filter(e => e.type === 'adenosine').length;
                                const dose = patientType === 'child'
                                    ? (adenoCount === 0 ? pedDoses?.adenosine1 : pedDoses?.adenosine2)
                                    : (adenoCount === 0 ? activeConfig.adenosineDose1 : activeConfig.adenosineDose2);
                                addEvent('adenosine', `מנה #${adenoCount + 1}`, dose || '');
                                setShowDrugsMenu(false);
                            }}
                            className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg text-sm font-bold"
                        >
                            אדנוזין<br/><span className="text-xs opacity-75">
                                {patientType === 'child' ? pedDoses?.adenosine1 : activeConfig.adenosineDose1}
                            </span>
                        </button>
                        
                        {/* Calcium */}
                        <button 
                            onClick={() => {
                                const dose = patientType === 'child' ? pedDoses?.calcium : activeConfig.calciumDose;
                                addEvent('calcium', 'CaCl / Ca Gluconate', dose || '');
                                setShowDrugsMenu(false);
                            }}
                            className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-bold"
                        >
                            סידן<br/><span className="text-xs opacity-75">
                                {patientType === 'child' ? pedDoses?.calcium : activeConfig.calciumDose}
                            </span>
                        </button>
                        
                        {/* Sodium Bicarbonate */}
                        <button 
                            onClick={() => {
                                const dose = patientType === 'child' ? pedDoses?.bicarb : activeConfig.bicarbDose;
                                addEvent('bicarb', 'NaHCO3', dose || '');
                                setShowDrugsMenu(false);
                            }}
                            className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg text-sm font-bold"
                        >
                            ביקרבונט<br/><span className="text-xs opacity-75">
                                {patientType === 'child' ? pedDoses?.bicarb : activeConfig.bicarbDose}
                            </span>
                        </button>
                        
                        {/* ROSC */}
                        <button 
                            onClick={() => {
                                addEvent('rosc', 'חזרת תפקוד לבבי', '');
                                setShowDrugsMenu(false);
                            }}
                            className="p-3 bg-green-500 text-white rounded-lg text-sm font-bold"
                        >
                            ROSC!<br/><span className="text-xs opacity-90">חזרת דופק</span>
                        </button>
                    </div>
                    <button onClick={() => setShowDrugsMenu(false)} className="w-full mt-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold">סגור</button>
                </div>
            )}

            {/* Event Log View */}
            {showLog && (
                <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 text-right animate-fade-in max-h-80 overflow-y-auto">
                    <h3 className="font-bold text-lg border-b pb-2 mb-3 dark:text-white text-center sticky top-0 bg-white dark:bg-dark-card">לוג אירועים - Timeline</h3>
                    {eventLog.length === 0 ? (
                        <p className="text-center text-slate-400 py-4">אין אירועים עדיין</p>
                    ) : (
                        <div className="space-y-2">
                            {eventLog.slice().reverse().map((event) => (
                                <div key={event.id} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)}`}></div>
                                    <div className="flex-1 text-right">
                                        <div className="font-bold text-sm text-slate-800 dark:text-white">{getEventLabel(event.type)}</div>
                                        {event.dose && <div className="text-xs text-slate-500 dark:text-slate-400">{event.dose}</div>}
                                        {event.details && <div className="text-xs text-slate-400 dark:text-slate-500">{event.details}</div>}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-mono text-xs text-slate-600 dark:text-slate-300">{formatTimestamp(event.timestamp)}</div>
                                        <div className="font-mono text-xs text-slate-400">+{formatTime(event.elapsedSeconds)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={() => setShowLog(false)} className="w-full mt-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold sticky bottom-0">סגור</button>
                </div>
            )}

            {/* H's & T's Modal */}
            {showCauses && (
                <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 text-right animate-fade-in">
                    <h3 className="font-bold text-lg border-b pb-2 mb-2 dark:text-white text-center">H's & T's - גורמים הפיכים</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-3">לחץ על פריט לפרטים נוספים</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <button onClick={() => { const item = allDataMap.get('pro_trauma_general'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-blue transition-colors">Hypovolemia - היפווולמיה</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <button onClick={() => { const item = allDataMap.get('proc_intubation'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-blue transition-colors">Hypoxia - היפוקסיה</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <button onClick={() => { const item = allDataMap.get('med-sodium-bicarbonate'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-blue transition-colors">H+ (Acidosis) - חמצת</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <button onClick={() => { const item = allDataMap.get('med-calcium-gluconate'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-blue transition-colors">Hypo/Hyperkalemia - K+</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <button onClick={() => { const item = allDataMap.get('pro_hypothermia'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-blue transition-colors">Hypothermia - היפותרמיה</button>
                            </li>
                            {patientType === 'child' && <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <button onClick={() => { const item = allDataMap.get('med3'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-blue transition-colors">Hypoglycemia - היפוגליקמיה</button>
                            </li>}
                        </ul>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <button onClick={() => { const item = allDataMap.get('proc_needle_thoracotomy'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-red transition-colors">Tension Pneumo - פנאומותורקס</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="text-slate-400 dark:text-slate-500">Tamponade - טמפונדה</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <button onClick={() => { const item = allDataMap.get('pro_trauma_poisoning'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-red transition-colors">Toxins - רעלים</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <button onClick={() => { const item = allDataMap.get('pro_acs'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-red transition-colors">Thrombosis PE - תסחיף ריאתי</button>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <button onClick={() => { const item = allDataMap.get('pro_acs'); if (item) onSelectItem(item); }} className="text-right underline decoration-dotted hover:text-uh-red transition-colors">Thrombosis MI - אוטם</button>
                            </li>
                        </ul>
                    </div>
                    <button onClick={() => setShowCauses(false)} className="w-full mt-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold">סגור</button>
                </div>
            )}

            {/* Quick Stats Bar */}
            {isActive && eventLog.length > 0 && (
                <div className="flex justify-around bg-slate-100 dark:bg-slate-800 p-2 rounded-xl text-xs">
                    {shockCount > 0 && <div className="text-center"><span className="font-bold text-yellow-600">{shockCount}</span><br/>שוקים</div>}
                    {epiCount > 0 && <div className="text-center"><span className="font-bold text-red-600">{epiCount}</span><br/>אדרנלין</div>}
                    {amioCount > 0 && <div className="text-center"><span className="font-bold text-purple-600">{amioCount}</span><br/>אמיודרון</div>}
                    {lidoCount > 0 && <div className="text-center"><span className="font-bold text-indigo-600">{lidoCount}</span><br/>לידוקאין</div>}
                </div>
            )}

            {/* Reset Button */}
            <div className="pt-2">
                <button 
                    onClick={reset} 
                    className="text-red-500 text-sm font-bold underline hover:text-red-700"
                >
                    סיום החייאה / איפוס נתונים
                </button>
            </div>
        </div>
    );
};

// --- GCS CALCULATOR ---
const GCSCalculator: React.FC = () => {
    const [eye, setEye] = useState(4);
    const [verbal, setVerbal] = useState(5);
    const [motor, setMotor] = useState(6);

    const total = eye + verbal + motor;

    const severity = total <= 8 ? 'מצב הכרה קשה (קומה)' : total <= 12 ? 'מצב הכרה בינוני' : 'מצב הכרה קל';
    const severityColor = total <= 8 ? 'bg-uh-red' : total <= 12 ? 'bg-uh-orange' : 'bg-uh-green';

    return (
        <div className="p-4 space-y-6 animate-fade-in text-right">
             <h1 className="text-3xl font-bold text-slate-800 dark:text-white text-center">מחשבון GCS</h1>
             
             <div className={`${severityColor} text-white p-6 rounded-2xl text-center shadow-lg transition-colors duration-500`}>
                <div className="text-6xl font-bold mb-2">{total}</div>
                <div className="font-bold text-lg opacity-90">{severity}</div>
             </div>

             <div className="space-y-4">
                <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow border border-slate-200 dark:border-slate-700">
                    <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">פתיחת עיניים (E)</label>
                    <select value={eye} onChange={(e) => setEye(Number(e.target.value))} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-right dark:text-white">
                        <option value={4}>4 - ספונטנית</option>
                        <option value={3}>3 - לקול</option>
                        <option value={2}>2 - לכאב</option>
                        <option value={1}>1 - ללא תגובה</option>
                    </select>
                </div>
                 <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow border border-slate-200 dark:border-slate-700">
                    <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">תגובה מילולית (V)</label>
                    <select value={verbal} onChange={(e) => setVerbal(Number(e.target.value))} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-right dark:text-white">
                        <option value={5}>5 - מתמצא בזמן ובמקום</option>
                        <option value={4}>4 - מבולבל</option>
                        <option value={3}>3 - מילים לא לעניין</option>
                        <option value={2}>2 - קולות/גניחות</option>
                        <option value={1}>1 - ללא תגובה</option>
                    </select>
                </div>
                 <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow border border-slate-200 dark:border-slate-700">
                    <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">תגובה מוטורית (M)</label>
                    <select value={motor} onChange={(e) => setMotor(Number(e.target.value))} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-right dark:text-white">
                        <option value={6}>6 - מציית לפקודות</option>
                        <option value={5}>5 - מאתר כאב</option>
                        <option value={4}>4 - נרתע מכאב</option>
                        <option value={3}>3 - פלקציה (Decorticate)</option>
                        <option value={2}>2 - אקסטנציה (Decerebrate)</option>
                        <option value={1}>1 - ללא תגובה</option>
                    </select>
                </div>
             </div>
        </div>
    );
};

// --- AVPU CALCULATOR ---
const AVPUCalculator: React.FC = () => {
    const [selected, setSelected] = useState<string | null>(null);

    const levels = [
        { code: 'A', name: 'Alert', desc: 'עירני, מגיב לסביבה', color: 'bg-green-500' },
        { code: 'V', name: 'Verbal', desc: 'מגיב לקול', color: 'bg-yellow-500' },
        { code: 'P', name: 'Pain', desc: 'מגיב לכאב', color: 'bg-orange-500' },
        { code: 'U', name: 'Unresponsive', desc: 'מחוסר הכרה', color: 'bg-red-500' },
    ];

    return (
        <div className="p-4 space-y-6 animate-fade-in text-right">
             <h1 className="text-3xl font-bold text-slate-800 dark:text-white text-center">הערכת AVPU</h1>
             <p className="text-center text-slate-500 dark:text-slate-300">לבדיקה מהירה של רמת ההכרה</p>

             <div className="grid grid-cols-2 gap-4">
                 {levels.map((level) => (
                     <button
                        key={level.code}
                        onClick={() => setSelected(level.code)}
                        className={`p-6 rounded-xl shadow-md border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${selected === level.code ? `border-white ring-4 ring-offset-2 ring-offset-slate-100 dark:ring-offset-dark-bg ring-${level.color.replace('bg-', '')} scale-105` : 'border-transparent bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                     >
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white ${level.color}`}>
                             {level.code}
                         </div>
                         <div className="font-bold text-slate-800 dark:text-white">{level.name}</div>
                     </button>
                 ))}
             </div>

             {selected && (
                 <div className="mt-8 p-6 bg-white dark:bg-dark-card rounded-2xl shadow-xl text-center animate-fade-in border-t-4 border-uh-blue">
                     <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">{levels.find(l => l.code === selected)?.code}</h2>
                     <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">
                        {levels.find(l => l.code === selected)?.desc}
                     </p>
                 </div>
             )}
        </div>
    );
};

// --- REFERENCE TABLES COMPONENT ---
const ReferenceTables: React.FC = () => {
    return (
        <div className="p-4 space-y-6 animate-fade-in text-right">
             <h1 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-6">טבלאות עזר לילדים</h1>
             
             {/* Blood Pressure Table */}
             <div className="bg-white dark:bg-dark-card rounded-xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
                 <div className="bg-slate-100 dark:bg-slate-800 p-3 font-bold text-slate-800 dark:text-white text-center border-b border-slate-200 dark:border-slate-700">
                     ערכי לחץ דם תקינים בילדים (ממ"כ)
                 </div>
                 <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                         <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                             <tr>
                                 <th className="p-2 text-right">גיל</th>
                                 <th className="p-2 text-center">סיסטולי</th>
                                 <th className="p-2 text-center">דיאסטולי</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-800 dark:text-slate-200">
                             <tr><td className="p-2">12 שעות (&lt;1kg)</td><td className="p-2 text-center" dir="ltr">39-59</td><td className="p-2 text-center" dir="ltr">16-36</td></tr>
                             <tr><td className="p-2">12 שעות (3kg)</td><td className="p-2 text-center" dir="ltr">50-70</td><td className="p-2 text-center" dir="ltr">25-45</td></tr>
                             <tr><td className="p-2">יילוד (96 שעות)</td><td className="p-2 text-center" dir="ltr">60-90</td><td className="p-2 text-center" dir="ltr">20-60</td></tr>
                             <tr><td className="p-2">תינוק (6 חודשים)</td><td className="p-2 text-center" dir="ltr">87-105</td><td className="p-2 text-center" dir="ltr">53-66</td></tr>
                             <tr><td className="p-2">פעוט (שנתיים)</td><td className="p-2 text-center" dir="ltr">95-105</td><td className="p-2 text-center" dir="ltr">53-66</td></tr>
                             <tr><td className="p-2">גיל בי"ס (7 שנים)</td><td className="p-2 text-center" dir="ltr">97-112</td><td className="p-2 text-center" dir="ltr">57-71</td></tr>
                             <tr><td className="p-2">מתבגר (15 שנים)</td><td className="p-2 text-center" dir="ltr">112-128</td><td className="p-2 text-center" dir="ltr">66-80</td></tr>
                         </tbody>
                     </table>
                 </div>
             </div>

             {/* Heart Rate Table */}
             <div className="bg-white dark:bg-dark-card rounded-xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
                 <div className="bg-slate-100 dark:bg-slate-800 p-3 font-bold text-slate-800 dark:text-white text-center border-b border-slate-200 dark:border-slate-700">
                     קצב לב בילדים בריאים (פעימות לדקה)
                 </div>
                 <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                         <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                             <tr>
                                 <th className="p-2 text-right">גיל</th>
                                 <th className="p-2 text-center">עירנות</th>
                                 <th className="p-2 text-center">ממוצע</th>
                                 <th className="p-2 text-center">שינה</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-800 dark:text-slate-200">
                             <tr><td className="p-2">יילוד - 3 חודשים</td><td className="p-2 text-center" dir="ltr">85-205</td><td className="p-2 text-center">140</td><td className="p-2 text-center" dir="ltr">80-160</td></tr>
                             <tr><td className="p-2">3 חודשים - שנתיים</td><td className="p-2 text-center" dir="ltr">100-190</td><td className="p-2 text-center">130</td><td className="p-2 text-center" dir="ltr">75-160</td></tr>
                             <tr><td className="p-2">שנתיים - 10</td><td className="p-2 text-center" dir="ltr">60-140</td><td className="p-2 text-center">80</td><td className="p-2 text-center" dir="ltr">60-90</td></tr>
                             <tr><td className="p-2">&gt; 10 שנים</td><td className="p-2 text-center" dir="ltr">60-100</td><td className="p-2 text-center">75</td><td className="p-2 text-center" dir="ltr">50-90</td></tr>
                         </tbody>
                     </table>
                 </div>
             </div>

             {/* Airway Equipment Table */}
             <div className="bg-white dark:bg-dark-card rounded-xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
                 <div className="bg-slate-100 dark:bg-slate-800 p-3 font-bold text-slate-800 dark:text-white text-center border-b border-slate-200 dark:border-slate-700">
                     ציוד נתיב אוויר לפי גיל
                 </div>
                 <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                         <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                             <tr>
                                 <th className="p-2 text-right">גיל</th>
                                 <th className="p-2 text-right">להב</th>
                                 <th className="p-2 text-center">טובוס</th>
                                 <th className="p-2 text-center">סקשן (F)</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-800 dark:text-slate-200">
                             <tr><td className="p-2">פג</td><td className="p-2">Mil 0</td><td className="p-2 text-center">2.5-3.0</td><td className="p-2 text-center">5-6</td></tr>
                             <tr><td className="p-2">יילוד</td><td className="p-2">Mil 0</td><td className="p-2 text-center">3.0-3.5</td><td className="p-2 text-center">6-8</td></tr>
                             <tr><td className="p-2">6 חודשים</td><td className="p-2">Mil 1</td><td className="p-2 text-center">3.5-4.0</td><td className="p-2 text-center">8</td></tr>
                             <tr><td className="p-2">שנה</td><td className="p-2">Mil 1</td><td className="p-2 text-center">4.0-4.5</td><td className="p-2 text-center">8</td></tr>
                             <tr><td className="p-2">שנתיים</td><td className="p-2">Mil 2</td><td className="p-2 text-center">4.5-5.0</td><td className="p-2 text-center">8</td></tr>
                             <tr><td className="p-2">4 שנים</td><td className="p-2">Mac 2</td><td className="p-2 text-center">5.0-5.5</td><td className="p-2 text-center">10</td></tr>
                             <tr><td className="p-2">6 שנים</td><td className="p-2">Mac 2</td><td className="p-2 text-center">5.5</td><td className="p-2 text-center">10</td></tr>
                             <tr><td className="p-2">8 שנים</td><td className="p-2">Mac 2</td><td className="p-2 text-center">6.0</td><td className="p-2 text-center">10</td></tr>
                             <tr><td className="p-2">10 שנים</td><td className="p-2">Mac 2</td><td className="p-2 text-center">6.5</td><td className="p-2 text-center">12</td></tr>
                             <tr><td className="p-2">12 שנים</td><td className="p-2">Mac 3</td><td className="p-2 text-center">7.0</td><td className="p-2 text-center">12</td></tr>
                             <tr><td className="p-2">מתבגר</td><td className="p-2">Mac 3</td><td className="p-2 text-center">7.0-8.0</td><td className="p-2 text-center">12</td></tr>
                         </tbody>
                     </table>
                 </div>
             </div>
        </div>
    );
};

// --- APGAR CALCULATOR ---
const APGARCalculator: React.FC = () => {
    const [scores, setScores] = useState([2, 2, 2, 2, 2]); // A, P, G, A, R

    const total = scores.reduce((a, b) => a + b, 0);
    const updateScore = (index: number, val: number) => {
        const newScores = [...scores];
        newScores[index] = val;
        setScores(newScores);
    };

    const labels = [
        { name: 'Appearance (מראה)', options: ['כחול/חיוור (0)', 'גוף ורוד, גפיים כחולות (1)', 'ורוד כולו (2)'] },
        { name: 'Pulse (דופק)', options: ['ללא (0)', 'מתחת ל-100 (1)', 'מעל 100 (2)'] },
        { name: 'Grimace (תגובה)', options: ['ללא (0)', 'עווית קלה (1)', 'בכי/שיעול (2)'] },
        { name: 'Activity (טונוס)', options: ['רפה (0)', 'כיפוף קל (1)', 'תנועה פעילה (2)'] },
        { name: 'Respiration (נשימה)', options: ['ללא (0)', 'איטית/לא סדירה (1)', 'בכי חזק (2)'] }
    ];

    return (
        <div className="p-4 space-y-6 animate-fade-in text-right">
             <h1 className="text-3xl font-bold text-slate-800 dark:text-white text-center">מחשבון APGAR</h1>
             
             <div className="bg-uh-purple text-white p-6 rounded-2xl text-center shadow-lg">
                <div className="text-6xl font-bold mb-2">{total}</div>
                <div className="font-bold text-lg opacity-90">{total >= 7 ? 'מצב תקין' : total >= 4 ? 'דיכוי בינוני' : 'מצב קריטי'}</div>
             </div>

             <div className="space-y-4">
                 {labels.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-dark-card p-4 rounded-xl shadow border border-slate-200 dark:border-slate-700">
                        <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">{item.name}</label>
                        <select value={scores[idx]} onChange={(e) => updateScore(idx, Number(e.target.value))} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-right dark:text-white">
                            {item.options.map((opt, valIdx) => (
                                <option key={valIdx} value={valIdx}>{opt}</option>
                            ))}
                        </select>
                    </div>
                 ))}
             </div>
        </div>
    );
};

// --- PEDIATRIC TAPE COMPONENT ---
type PediatricData = {
    tube: string;
    blade: string;
    suction: string;
    sysBP: string;
    hr: string;
}

const PEDIATRIC_DATA: Record<number, PediatricData> = {
    1: { tube: "4.0 - 4.5", blade: "Mil 1", suction: "8", sysBP: "87-105", hr: "100-190" },
    2: { tube: "4.5 - 5.0", blade: "Mil 2", suction: "8", sysBP: "95-105", hr: "60-140" },
    3: { tube: "5.0", blade: "Mil 2", suction: "10", sysBP: "95-108", hr: "60-140" }, // Interpolated
    4: { tube: "5.0 - 5.5", blade: "Mac 2", suction: "10", sysBP: "97-112", hr: "60-140" },
    5: { tube: "5.5", blade: "Mac 2", suction: "10", sysBP: "97-112", hr: "60-140" }, // Interpolated
    6: { tube: "5.5", blade: "Mac 2", suction: "10", sysBP: "97-112", hr: "60-140" },
    7: { tube: "6.0", blade: "Mac 2", suction: "10", sysBP: "97-112", hr: "60-140" }, // Table 21.9
    8: { tube: "6.0", blade: "Mac 2", suction: "10", sysBP: "97-112", hr: "60-140" },
    9: { tube: "6.5", blade: "Mac 2", suction: "12", sysBP: "100-118", hr: "60-100" }, // Interpolated
    10: { tube: "6.5", blade: "Mac 2", suction: "12", sysBP: "105-120", hr: "60-100" },
    11: { tube: "7.0", blade: "Mac 3", suction: "12", sysBP: "108-124", hr: "60-100" }, // Interpolated
    12: { tube: "7.0", blade: "Mac 3", suction: "12", sysBP: "112-128", hr: "60-100" },
};

const PediatricTape: React.FC = () => {
    const [age, setAge] = useState(5);
    const weight = (age * 2) + 8;
    const data = PEDIATRIC_DATA[age];
    
    // Calculations
    const fluidBolus = weight * 20; // 20ml/kg
    const epiDose = (Math.min(0.01 * weight, 0.5)).toFixed(2); // 0.01 mg/kg max 0.5
    const midazolam = (Math.min(0.1 * weight, 5)).toFixed(1); // 0.1 mg/kg max 5

    return (
        <div className="p-4 space-y-6 animate-fade-in text-right">
             <h1 className="text-3xl font-bold text-slate-800 dark:text-white text-center">סרט מידה רפואי</h1>
             
             <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2 text-xl text-center">גיל: {age} שנים</label>
                <input 
                    type="range" 
                    min="1" 
                    max="12" 
                    step="1" 
                    value={age} 
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-uh-blue"
                />
                <div className="text-center mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <span className="text-slate-500 dark:text-slate-300">משקל מוערך: </span>
                    <span className="text-2xl font-bold text-slate-800 dark:text-white">{weight} ק"ג</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-r-4 border-uh-blue">
                     <div className="text-sm text-slate-500 dark:text-slate-300">גודל טובוס (מ"מ)</div>
                     <div className="text-2xl font-bold text-slate-800 dark:text-white">{data.tube}</div>
                 </div>
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-r-4 border-uh-blue">
                     <div className="text-sm text-slate-500 dark:text-slate-300">להב לרינגוסקופ</div>
                     <div className="text-xl font-bold text-slate-800 dark:text-white">{data.blade}</div>
                 </div>
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-r-4 border-uh-blue">
                     <div className="text-sm text-slate-500 dark:text-slate-300">קטטר שאיבה (F)</div>
                     <div className="text-2xl font-bold text-slate-800 dark:text-white">{data.suction}</div>
                 </div>
                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-r-4 border-uh-green">
                     <div className="text-sm text-slate-500 dark:text-slate-300">דופק ממוצע</div>
                     <div className="text-2xl font-bold text-slate-800 dark:text-white">{data.hr}</div>
                 </div>
                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-r-4 border-uh-green">
                     <div className="text-sm text-slate-500 dark:text-slate-300">ל"ד סיסטולי</div>
                     <div className="text-2xl font-bold text-slate-800 dark:text-white">{data.sysBP}</div>
                 </div>
                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-r-4 border-uh-green">
                     <div className="text-sm text-slate-500 dark:text-slate-300">נוזלים (20ml/kg)</div>
                     <div className="text-2xl font-bold text-slate-800 dark:text-white">{fluidBolus} מ"ל</div>
                 </div>
                 <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border-r-4 border-uh-red">
                     <div className="text-sm text-slate-500 dark:text-slate-300">אדרנלין החייאה</div>
                     <div className="text-2xl font-bold text-slate-800 dark:text-white">{epiDose} מ"ג</div>
                 </div>
                 <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border-r-4 border-uh-purple">
                     <div className="text-sm text-slate-500 dark:text-slate-300">דורמיקום (0.1)</div>
                     <div className="text-2xl font-bold text-slate-800 dark:text-white">{midazolam} מ"ג</div>
                 </div>
             </div>
        </div>
    );
};

// --- CATEGORY SELECTION CARD COMPONENT ---
const CategorySelectionCard: React.FC<{ title: string; icon?: React.ReactNode; onClick: () => void; className?: string }> = ({ title, icon, onClick, className = "" }) => (
    <div onClick={onClick} className={`bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center gap-4 text-center transition-all active:scale-[0.98] cursor-pointer h-40 ${className}`} role="button" tabIndex={0}>
        {icon && <div className="text-slate-600 dark:text-slate-300">{icon}</div>}
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h2>
    </div>
);

// --- PROTOCOL AGE GROUP VIEW ---
const ProtocolAgeGroupView: React.FC<{ onSelectAgeGroup: (view: 'adult' | 'pediatric') => void }> = ({ onSelectAgeGroup }) => (
    <div className="p-4 sm:p-6 space-y-4 animate-fade-in">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white px-2 pb-2 text-right">פרוטוקולים</h1>
        <div className="grid grid-cols-2 gap-4">
            <CategorySelectionCard 
                title="מבוגרים" 
                icon={<UserIcon className="w-12 h-12 text-uh-blue" />}
                onClick={() => onSelectAgeGroup('adult')} 
            />
            <CategorySelectionCard 
                title="ילדים" 
                icon={<BabyIcon className="w-12 h-12 text-uh-orange" />}
                onClick={() => onSelectAgeGroup('pediatric')} 
            />
        </div>
    </div>
);


// --- NEW PROTOCOL GRID VIEW COMPONENTS ---
const ProtocolCard: React.FC<{ protocol: Protocol; onClick: () => void }> = ({ protocol, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 p-3 flex items-center justify-center text-center transition-all active:scale-[0.97] cursor-pointer min-h-[5rem]"
        role="button"
        tabIndex={0}
    >
        <h3 className="font-semibold text-base leading-snug text-slate-700 dark:text-slate-200 line-clamp-3">{protocol.name}</h3>
    </div>
);

const ProtocolGridView: React.FC<{
    title: string;
    protocolGroups: Record<string, Protocol[]>;
    onBack: () => void;
    onSelectItem: (item: SearchableItem) => void;
}> = ({ title, protocolGroups, onBack, onSelectItem }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('הכל');
    
    const categories = Object.keys(protocolGroups).sort((a, b) => a.localeCompare(b, 'he'));
    const allCategories = ['הכל', ...categories];

    const displayedGroups = selectedFilter === 'הכל' 
        ? categories 
        : categories.filter(c => c === selectedFilter);

    return (
        <div className="animate-fade-in flex flex-col">
            <div className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-900 shadow-sm">
                <div className="p-4 sm:p-6 flex items-center border-b border-slate-200 dark:border-slate-700">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800" aria-label="Back">
                        <BackIcon className="w-6 h-6 text-slate-600 dark:text-slate-300 transform rotate-180" />
                    </button>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex-grow text-right mr-4">{title}</h1>
                </div>
                
                {/* Horizontal Category Filter */}
                <div className="flex overflow-x-auto gap-2 p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 no-scrollbar">
                     {allCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedFilter(cat)}
                            className={`flex-shrink-0 px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
                                selectedFilter === cat 
                                    ? 'bg-uh-blue text-white shadow-md' 
                                    : 'bg-white dark:bg-dark-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                        >
                            {cat}
                        </button>
                     ))}
                </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6 pb-40">
                {displayedGroups.map(category => (
                    <div key={category}>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 text-right border-r-4 border-uh-red pr-3">{category}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {protocolGroups[category].map(protocol => (
                                <ProtocolCard key={protocol.id} protocol={protocol} onClick={() => onSelectItem(protocol)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MEDICATION GRID VIEW CARD ---
const cardColors = ['border-uh-red', 'border-uh-blue', 'border-uh-orange', 'border-uh-green', 'border-uh-yellow', 'border-uh-purple'];

const MedicationCard: React.FC<{ medication: Medication; onClick: () => void; color: string; }> = ({ medication, onClick, color }) => (
    <div
        onClick={onClick}
        className={`bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg border-t-4 ${color} p-3 flex flex-col items-center justify-center text-center transition-all active:scale-[0.97] cursor-pointer h-32`}
        role="button"
        tabIndex={0}
    >
        <PillIcon className="w-8 h-8 text-slate-500 dark:text-slate-300 mb-2" />
        <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200">{medication.name}</h3>
    </div>
);


// --- DOSE CALCULATOR COMPONENT ---
const DoseCalculator: React.FC<{ med: Medication }> = ({ med }) => {
    const [patientType, setPatientType] = useState<'adult' | 'pediatric'>('adult');
    const [selectedDosage, setSelectedDosage] = useState<Dosage | null>(null);
    const [weight, setWeight] = useState('');
    const [pulse, setPulse] = useState(false);

    // Filter dosages based on patient type
    const filteredDosages = useMemo(() => {
        return med.dosages.filter(d => {
            const isPed = d.indication.includes('ילד') || d.indication.includes('תינוק') || d.indication.includes('פג');
            const isAdult = d.indication.includes('מבוגר');
            
            if (patientType === 'pediatric') return isPed;
            // For adult, show adult + those that don't specify (general) unless they are strictly ped
            return isAdult || !isPed;
        });
    }, [med.dosages, patientType]);

    // Reset selection when patient type changes
    useEffect(() => {
        if (filteredDosages.length > 0) {
            setSelectedDosage(filteredDosages[0]);
        } else {
            setSelectedDosage(null);
        }
        setWeight('');
    }, [filteredDosages, patientType]);

    useEffect(() => {
        if (weight) {
            setPulse(true);
            const timer = setTimeout(() => setPulse(false), 500);
            return () => clearTimeout(timer);
        }
    }, [weight]);

    const calculationResult = useMemo(() => {
        if (!selectedDosage) return null;

        const isWeightBased = typeof selectedDosage.dosePerKg === 'number';
        if (isWeightBased && !weight) return null;

        const concentration = selectedDosage.concentration ?? med.concentration;
        const weightNum = parseFloat(weight) || 0;
        
        // Check if this is range-based dosing (has both min and max per kg)
        const isRangeBased = typeof selectedDosage.dosePerKgMax === 'number';
        
        if (isRangeBased && selectedDosage.dosePerKg && selectedDosage.dosePerKgMax) {
            // Range-based dosing (e.g., glucose 0.2-0.5 g/kg)
            let minDoseMg = weightNum * selectedDosage.dosePerKg;
            let maxDoseMg = weightNum * selectedDosage.dosePerKgMax;
            
            // Apply absolute max dose cap
            const isMinMaxDoseReached = selectedDosage.maxDose ? minDoseMg > selectedDosage.maxDose : false;
            const isMaxMaxDoseReached = selectedDosage.maxDose ? maxDoseMg > selectedDosage.maxDose : false;
            
            if (isMinMaxDoseReached) minDoseMg = selectedDosage.maxDose as number;
            if (isMaxMaxDoseReached) maxDoseMg = selectedDosage.maxDose as number;
            
            // Calculate volumes
            const minDoseMl = (concentration && concentration > 0) ? (minDoseMg / concentration).toFixed(1) : null;
            const maxDoseMl = (concentration && concentration > 0) ? (maxDoseMg / concentration).toFixed(1) : null;
            
            return {
                isRange: true,
                minDoseMg: parseFloat(minDoseMg.toFixed(1)),
                maxDoseMg: parseFloat(maxDoseMg.toFixed(1)),
                minDoseMl,
                maxDoseMl,
                isMaxDoseReached: isMaxMaxDoseReached,
                doseMg: 0,
                doseMl: null,
            };
        }

        // Standard single-value dosing
        let doseMg = selectedDosage.fixedDose ?? 0;
        if (isWeightBased && selectedDosage.dosePerKg) {
            doseMg = weightNum * selectedDosage.dosePerKg;
        }

        const isMaxDoseReached = selectedDosage.maxDose ? doseMg > selectedDosage.maxDose : false;
        if (isMaxDoseReached) {
            doseMg = selectedDosage.maxDose as number;
        }
        
        const doseMl = (concentration && concentration > 0) ? (doseMg / concentration).toFixed(2) : null;

        const finalDoseMg = parseFloat(doseMg.toFixed(3));

        return {
            isRange: false,
            doseMg: finalDoseMg,
            doseMl,
            isMaxDoseReached,
        };
    }, [weight, selectedDosage, med.concentration]);


    return (
        <div className="bg-orange-50 dark:bg-slate-800/50 rounded-xl border border-orange-200 dark:border-orange-900/50 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="p-4 border-b border-orange-200 dark:border-orange-900/50 flex justify-between items-center bg-orange-100/50 dark:bg-orange-900/20">
                <h2 className="text-xl font-bold text-uh-orange flex items-center gap-2">
                    <CalculatorIcon className="w-6 h-6" />
                    מחשבון מינון
                </h2>
                
                {/* Adult/Pediatric Toggle */}
                <div className="flex bg-white dark:bg-slate-700 rounded-lg p-1 shadow-sm border border-orange-100 dark:border-slate-600">
                    <button 
                        onClick={() => setPatientType('adult')}
                        className={`px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-1 transition-all ${patientType === 'adult' ? 'bg-uh-blue text-white shadow' : 'text-slate-500 hover:text-slate-700 dark:text-slate-300'}`}
                    >
                        <UserIcon className="w-4 h-4" /> מבוגר
                    </button>
                    <button 
                        onClick={() => setPatientType('pediatric')}
                        className={`px-3 py-1.5 rounded-md text-sm font-bold flex items-center gap-1 transition-all ${patientType === 'pediatric' ? 'bg-uh-blue text-white shadow' : 'text-slate-500 hover:text-slate-700 dark:text-slate-300'}`}
                    >
                        <BabyIcon className="w-4 h-4" /> ילד
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Dosage Selection */}
                {filteredDosages.length > 0 ? (
                    <div className="space-y-3">
                         {filteredDosages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                {filteredDosages.map((dosage, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedDosage(dosage)}
                                        className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-bold border transition-colors ${selectedDosage === dosage ? 'bg-uh-blue text-white border-uh-blue' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-uh-blue'}`}
                                    >
                                        {dosage.indication}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {/* Weight Input */}
                        {selectedDosage && typeof selectedDosage.dosePerKg === 'number' && (
                             <div className="flex items-center gap-3">
                                <label className="font-bold text-slate-700 dark:text-slate-200 w-24">משקל (ק"ג):</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-center font-bold text-lg bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-uh-orange outline-none"
                                    placeholder="0"
                                />
                            </div>
                        )}

                        {/* Result Display Area */}
                        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
                            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200 dark:border-slate-700/50 border-dashed">
                                <span className="text-slate-500 dark:text-slate-300 text-sm font-medium">מנה:</span>
                                {calculationResult ? (
                                    calculationResult.isRange ? (
                                        <div className="text-left">
                                            <div className={`font-bold text-uh-blue dark:text-blue-400 ${pulse ? 'animate-pulse-once' : ''}`}>
                                                <div className="text-sm text-slate-500 mb-1">מינ׳: <span className="text-xl text-uh-blue dark:text-blue-400">{calculationResult.minDoseMg}</span> מ"ג = <span className="font-mono">{calculationResult.minDoseMl}</span> מ"ל</div>
                                                <div className="text-sm text-slate-500">מקס׳: <span className="text-xl text-uh-blue dark:text-blue-400">{calculationResult.maxDoseMg}</span> מ"ג = <span className="font-mono">{calculationResult.maxDoseMl}</span> מ"ל</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-left">
                                             <div className={`text-3xl font-bold text-uh-blue dark:text-blue-400 ${pulse ? 'animate-pulse-once' : ''}`}>
                                                {calculationResult.doseMg} <span className="text-lg text-slate-500">מ"ג</span>
                                             </div>
                                             {calculationResult.doseMl && (
                                                 <div className="text-sm text-slate-500 dark:text-slate-300 font-mono">
                                                     = {calculationResult.doseMl} מ"ל
                                                 </div>
                                             )}
                                        </div>
                                    )
                                ) : (
                                    <span className="text-2xl font-bold text-slate-300">---</span>
                                )}
                            </div>
                            
                            {selectedDosage && (
                                <div className="space-y-1 text-sm text-right">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 dark:text-slate-300">דרך מתן:</span>
                                        <span className="font-bold text-slate-800 dark:text-white">{selectedDosage.route}</span>
                                    </div>
                                     <div className="flex justify-between items-start">
                                        <span className="text-slate-500 dark:text-slate-300 ml-2">דגשים:</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-300 text-left max-w-[70%]">{selectedDosage.administrationNotes}</span>
                                    </div>
                                    {calculationResult?.isMaxDoseReached && (
                                        <div className="pt-2 text-amber-600 font-bold text-center text-xs">
                                            שים לב: הושגה מנה מירבית ({selectedDosage.maxDose} מ"ג)
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-4">
                        לא קיימים מינונים להתוויה זו
                    </div>
                )}
            </div>
        </div>
    );
}

// --- PROCEDURE CHECKLIST COMPONENT ---
const ProcedureChecklist: React.FC<{ procedure: Procedure }> = ({ procedure }) => {
    const [checkedSteps, setCheckedSteps] = useState<boolean[]>(() => new Array(procedure.steps.length).fill(false));

    useEffect(() => {
        setCheckedSteps(new Array(procedure.steps.length).fill(false));
    }, [procedure.id, procedure.steps.length]);

    const handleToggleStep = (index: number) => {
        setCheckedSteps(prev => {
            const newChecked = [...prev];
            newChecked[index] = !newChecked[index];
            return newChecked;
        });
    };

    const handleReset = () => {
        setCheckedSteps(new Array(procedure.steps.length).fill(false));
    };

    const completedCount = checkedSteps.filter(Boolean).length;
    const totalSteps = procedure.steps.length;
    const progress = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

    if (!procedure.steps || procedure.steps.length === 0) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-r-4 border-uh-orange pr-3">סדר הפעולות</h2>
                {completedCount > 0 && (
                    <button onClick={handleReset} className="text-sm font-semibold text-uh-blue dark:text-blue-400 hover:underline">אפס רשימה</button>
                )}
            </div>
            <div className="p-4 space-y-3">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className="bg-uh-green h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-300 text-left" aria-live="polite">{completedCount} / {totalSteps} הושלמו</div>
                
                <ul className="space-y-3 pt-2">
                    {procedure.steps.map((step, index) => (
                        <li key={index} onClick={() => handleToggleStep(index)} className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800" role="checkbox" aria-checked={checkedSteps[index]}>
                            <div className={`flex-shrink-0 w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                ${checkedSteps[index] ? 'bg-uh-green border-uh-green' : 'bg-white dark:bg-dark-card border-slate-400 group-hover:border-uh-green'}`}>
                                {checkedSteps[index] && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span className={`flex-1 text-lg transition-colors ${checkedSteps[index] ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-white'}`}>
                                {step}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// --- DRUG LINK COMPONENT ---
const DrugLink: React.FC<{ children: React.ReactNode, onClick: (e: React.MouseEvent) => void }> = ({ children, onClick }) => (
    <span onClick={onClick} className="font-semibold text-uh-orange border-b border-dashed border-uh-orange/70 hover:border-solid hover:border-uh-orange cursor-pointer transition-all">
        {children}
    </span>
);

// --- LINKABLE ITEM TYPE ---
interface LinkableItem {
    id: string;
    name: string;
    hebrewName: string;
    aliases?: string[];
    type: 'medication' | 'procedure';
}

// --- DETAIL VIEW COMPONENT ---
interface DetailViewProps {
    item: SearchableItem;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    onSelectItem: (item: SearchableItem) => void;
    drugProtocolMap: Map<string, string[]>;
    medicationNames: LinkableItem[];
    procedureNames: LinkableItem[];
    allDataMap: Map<string, SearchableItem>;
    onReportFeedback: (context: string) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, isFavorite, onToggleFavorite, onSelectItem, drugProtocolMap, medicationNames, procedureNames, allDataMap, onReportFeedback }) => {

    const renderProtocolPoint = (point: string) => {
        // Combine all linkable items (medications + procedures) with their aliases
        const allLinkableItems: { id: string; matchText: string; type: 'medication' | 'procedure' }[] = [];
        
        // Add medications with their Hebrew names and aliases
        medicationNames.forEach(med => {
            allLinkableItems.push({ id: med.id, matchText: med.hebrewName, type: 'medication' });
            if (med.aliases) {
                med.aliases.forEach(alias => {
                    allLinkableItems.push({ id: med.id, matchText: alias, type: 'medication' });
                });
            }
        });
        
        // Add procedures with their Hebrew names and aliases
        procedureNames.forEach(proc => {
            allLinkableItems.push({ id: proc.id, matchText: proc.hebrewName, type: 'procedure' });
            if (proc.aliases) {
                proc.aliases.forEach(alias => {
                    allLinkableItems.push({ id: proc.id, matchText: alias, type: 'procedure' });
                });
            }
        });
        
        // Sort by length (longer matches first to avoid partial matching)
        const sortedItems = allLinkableItems.sort((a, b) => b.matchText.length - a.matchText.length);
        const escapedNames = sortedItems.map(item => item.matchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex = new RegExp(`(${escapedNames.join('|')})`, 'g');
        const parts = point.split(regex);

        return (
             <React.Fragment>
                 {parts.map((part, index) => {
                     const matchingItem = sortedItems.find(item => item.matchText === part);
                     if (matchingItem) {
                         const linkedItem = allDataMap.get(matchingItem.id);
                         if (linkedItem) {
                             const linkClass = matchingItem.type === 'medication' 
                                 ? "font-semibold text-uh-orange border-b border-dashed border-uh-orange/70 hover:border-solid hover:border-uh-orange cursor-pointer transition-all"
                                 : "font-semibold text-uh-blue border-b border-dashed border-uh-blue/70 hover:border-solid hover:border-uh-blue cursor-pointer transition-all";
                             return (
                                 <span 
                                     key={`${matchingItem.id}-${index}`} 
                                     onClick={(e) => { e.stopPropagation(); onSelectItem(linkedItem); }}
                                     className={linkClass}
                                 >
                                     {part}
                                 </span>
                             );
                         }
                     }
                     return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
                 })}
             </React.Fragment>
         );
    };
    
    const renderSection = (title: string, borderColor: string, children: React.ReactNode) => (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <h2 className={`text-2xl font-bold text-slate-800 dark:text-white p-4 border-r-4 ${borderColor}`}>{title}</h2>
            <div className="p-4 space-y-2 text-right text-lg text-slate-700 dark:text-slate-300">
                {children}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (item.type) {
            case ItemType.Medication:
                const med = item as Medication;
                const relatedProtocols = drugProtocolMap.get(med.id);
                return (
                    <div className="space-y-6">
                        {/* Indication Header Card */}
                        <div className="bg-white dark:bg-dark-card border-t-4 border-uh-blue shadow-md rounded-b-xl p-5">
                             <h3 className="text-uh-blue dark:text-blue-400 font-bold text-sm mb-1">התוויה</h3>
                             <p className="text-xl font-bold text-slate-800 dark:text-white">{med.indication}</p>
                             {med.concentration && med.concentration > 0 && <p className="text-slate-500 mt-2 text-sm">ריכוז: {med.concentration} מ"ג/מ"ל</p>}
                        </div>

                        {/* Contraindications - Alert Style */}
                        {med.contraindications && med.contraindications.length > 0 && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                <h3 className="text-red-700 dark:text-red-400 font-bold flex items-center gap-2 mb-3">
                                    <AlertTriangleIcon className="w-5 h-5" />
                                    התוויות נגד
                                </h3>
                                <ul className="space-y-2">
                                    {med.contraindications.map((c, i) => (
                                        <li key={i} className="flex items-start gap-2 text-red-800 dark:text-red-300">
                                            <CrossIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Dosage Calculator */}
                        {med.dosages && med.dosages.length > 0 && <DoseCalculator med={med} />}
                        
                        {/* Additional Info Sections */}
                        {(med.appearance || med.packaging || med.storage) && (
                            <div className="bg-white dark:bg-dark-card rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 space-y-3">
                                <h3 className="font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">זיהוי ואחסון</h3>
                                {med.appearance && <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-600 dark:text-slate-400">מראה:</span> {med.appearance}</p>}
                                {med.packaging && <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-600 dark:text-slate-400">אריזה נפוצה:</span> {med.packaging}</p>}
                                {med.storage && <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold text-slate-600 dark:text-slate-400">הוראות אחסון:</span> {med.storage}</p>}
                            </div>
                        )}

                        {/* Notes */}
                        {med.notes && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-2">הערות</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{med.notes}</p>
                            </div>
                        )}

                        {/* Category */}
                        {med.category && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-2">קבוצה</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">{med.category}</p>
                            </div>
                        )}

                        {/* Mechanism of Action */}
                        {med.mechanismOfAction && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-2">מנגנון פעולה</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{med.mechanismOfAction}</p>
                            </div>
                        )}

                        {/* Pharmacokinetics */}
                        {med.pharmacokinetics && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-2">פרמקוקינטיקה</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{med.pharmacokinetics}</p>
                            </div>
                        )}

                        {/* Side Effects */}
                        {med.sideEffects && (
                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                                <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-2">תופעות לוואי</h3>
                                <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">{med.sideEffects}</p>
                            </div>
                        )}

                        {/* Administration Forms */}
                        {med.administrationForms && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-2">צורות מתן</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">{med.administrationForms}</p>
                            </div>
                        )}

                        {/* Pregnancy Safety */}
                        {med.pregnancySafety && (
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h3 className="font-bold text-purple-800 dark:text-purple-400 mb-2">בטיחות בהריון והנקה</h3>
                                <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">{med.pregnancySafety}</p>
                            </div>
                        )}

                        {/* Related Protocols from medication data */}
                        {med.relatedProtocols && med.relatedProtocols.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-500 text-sm px-2">מופיע בפרוטוקול:</h3>
                                {med.relatedProtocols.map(rp => {
                                    const protocol = allDataMap.get(rp.id) as Protocol;
                                    return (
                                        <button 
                                            key={rp.id} 
                                            onClick={() => protocol && onSelectItem(protocol)}
                                            className="w-full text-right p-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-lg hover:border-uh-blue transition-colors font-medium text-slate-700 dark:text-slate-200 flex justify-between items-center"
                                        >
                                            <span>{rp.name}</span>
                                            <BackIcon className="w-4 h-4 text-slate-400" />
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Linked Protocols */}
                         {relatedProtocols && relatedProtocols.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-500 text-sm px-2">מוזכר בפרוטוקולים:</h3>
                                {relatedProtocols.map(protocolId => {
                                    const protocol = allDataMap.get(protocolId) as Protocol;
                                    if (!protocol) return null;
                                    return (
                                        <button 
                                            key={protocol.id} 
                                            onClick={() => onSelectItem(protocol)}
                                            className="w-full text-right p-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-lg hover:border-uh-blue transition-colors font-medium text-slate-700 dark:text-slate-200 flex justify-between items-center"
                                        >
                                            <span>{protocol.name}</span>
                                            <BackIcon className="w-4 h-4 text-slate-400" />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            case ItemType.Protocol:
                const proto = item as Protocol;
                return (
                    <>
                        {proto.content.map((section, index) => (
                           <div key={index} className="bg-white dark:bg-dark-card rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-r-4 border-uh-orange pr-3">{section.title}</h2>
                                <ul className="space-y-2.5 pr-2 text-right">
                                    {section.points.map((point, pIndex) => (
                                        <li key={pIndex} className="flex items-start gap-3">
                                            <span className="text-uh-orange mt-1.5">&#9679;</span>
                                            <span className="flex-1 text-lg text-slate-700 dark:text-slate-300">{renderProtocolPoint(point)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        
                        {/* Source Section */}
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 mt-6">
                             <div className="flex items-center gap-2 mb-2 opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <h3 className="font-bold text-slate-600 dark:text-slate-300">מקור / סימוכין</h3>
                             </div>
                             <p className="text-slate-600 dark:text-slate-300 pr-2 border-r-2 border-slate-300 dark:border-slate-600">
                                {proto.source || "אוגדן פרוטוקולים רפואיים (ALS) - אגף רפואה, איחוד הצלה (מהדורת 2023)"}
                             </p>
                        </div>
                    </>
                );
            case ItemType.Procedure:
                const proc = item as Procedure;
                return (
                     <>
                        {proc.indications && proc.indications.length > 0 && renderSection("התוויות", "border-uh-green", 
                             <ul className="space-y-2.5 pr-2 text-right">{proc.indications.map((p, i) => <li key={i} className="flex gap-3"><span className="text-uh-green mt-1.5">&#9679;</span><span className="flex-1">{p}</span></li>)}</ul>
                        )}
                        {proc.contraindications && proc.contraindications.length > 0 && renderSection("התוויות נגד", "border-uh-red", 
                            <ul className="space-y-2.5 pr-2 text-right">{proc.contraindications.map((c, i) => <li key={i} className="flex gap-3 text-red-600 dark:text-red-400"><span className="mt-1.5">&#9679;</span><span className="flex-1">{c}</span></li>)}</ul>
                        )}
                        {proc.complications && proc.complications.length > 0 && renderSection("סיבוכים אפשריים", "border-uh-purple", 
                             <ul className="space-y-2.5 pr-2 text-right">{proc.complications.map((p, i) => <li key={i} className="flex gap-3"><span className="text-uh-purple mt-1.5">&#9679;</span><span className="flex-1">{p}</span></li>)}</ul>
                        )}
                        {proc.preparation && proc.preparation.length > 0 && renderSection("ציוד נדרש", "border-uh-blue", 
                            <ul className="space-y-2.5 pr-2 text-right">{proc.preparation.map((p, i) => <li key={i} className="flex gap-3"><span className="text-uh-blue dark:text-blue-400 mt-1.5">&#9679;</span><span className="flex-1">{p}</span></li>)}</ul>
                        )}
                         {proc.guidelines && proc.guidelines.length > 0 && renderSection("דגשים כלליים", "border-uh-yellow", 
                            <ul className="space-y-2.5 pr-2 text-right">{proc.guidelines.map((g, i) => <li key={i} className="flex gap-3"><span className="text-uh-yellow mt-1.5">&#9679;</span><span className="flex-1">{g}</span></li>)}</ul>
                        )}
                         <ProcedureChecklist procedure={proc} />
                    </>
                );
        }
    };

    const summary = 'summary' in item ? item.summary : ('indication' in item ? item.indication : '');
    const category = 'category' in item ? item.category : item.type;
    const categoryColor = item.type === ItemType.Protocol ? 'bg-red-100 dark:bg-red-900/30 text-uh-red dark:text-red-400' : item.type === ItemType.Procedure ? 'bg-orange-100 dark:bg-orange-900/30 text-uh-orange dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-uh-blue dark:text-blue-400';

    return (
        <div className="p-4 sm:p-6 space-y-6 animate-fade-in">
            <div className="flex justify-between items-start">
                 <div className="text-right flex-grow">
                    <span className={`text-sm font-semibold py-1 px-3 rounded-full ${categoryColor}`}>{category}</span>
                    <h1 className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">{item.name}</h1>
                </div>
                <button onClick={() => onToggleFavorite(item.id)} className="p-2 ml-2 rounded-full text-slate-400 hover:text-uh-orange flex-shrink-0" aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
>
                    <StarIcon className={`w-7 h-7 transition-colors ${isFavorite ? 'fill-uh-orange text-uh-orange' : 'fill-none'}`} />
                </button>
            </div>
            {renderContent()}
            
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
                <button 
                    onClick={() => onReportFeedback(item.name)}
                    className="flex items-center justify-center gap-2 mx-auto text-slate-400 hover:text-uh-orange transition-colors text-sm font-medium"
                >
                    <FlagIcon className="w-4 h-4" />
                    דיווח על טעות / משוב לדף זה
                </button>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
type ProtocolNavState = 
    { level: 'main' } | 
    { level: 'ageGroup', ageGroup: 'adult' | 'pediatric' };

// Helper to check for sub-screens
const TOOL_SCREENS: Screen[] = ['cpr', 'calc_gcs', 'calc_apgar', 'pedi_tape', 'calc_avpu', 'ref_tables', 'important_numbers'];

const getScreenTitle = (screen: Screen): string | null => {
    switch(screen) {
        case 'cpr': return 'ניהול החייאה';
        case 'pedi_tape': return 'סרט מידה רפואי';
        case 'important_numbers': return 'מספרים חשובים';
        case 'calc_gcs': return 'מחשבון GCS';
        case 'calc_avpu': return 'הערכת AVPU';
        case 'ref_tables': return 'טבלאות עזר';
        case 'calc_apgar': return 'מחשבון APGAR';
        case 'admin': return 'ממשק ניהול';
        default: return null;
    }
};

function AppContent() {
    const { medications, protocols, procedures } = useAdminData();
    
    const allData = useMemo(() => {
        return [...medications, ...protocols, ...procedures] as SearchableItem[];
    }, [medications, protocols, procedures]);

    const [activeScreen, setActiveScreen] = useState<Screen>('home');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState<SearchableItem | null>(null);
    const [protocolNavState, setProtocolNavState] = useState<ProtocolNavState>({ level: 'main' });
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const mainRef = useRef<HTMLElement | null>(null);

    // Dark Mode State
    const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

    // Auto-update logic
    useEffect(() => {
        const storedVersion = localStorage.getItem('app_version');
        if (storedVersion && storedVersion !== APP_VERSION) {
            // Version mismatch! This means the code bundle is new, but local storage is old.
            // Force clean up caches if possible
            if ('caches' in window) {
                caches.keys().then((names) => {
                    names.forEach((name) => {
                        caches.delete(name);
                    });
                });
            }
            // Update stored version
            localStorage.setItem('app_version', APP_VERSION);
            // Force reload to ensure fresh assets
            window.location.reload();
        } else if (!storedVersion) {
            // First run
            localStorage.setItem('app_version', APP_VERSION);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    // Meds Filter State
    const [medFilterLetter, setMedFilterLetter] = useState<string | null>(null);

    // Feedback & Admin State
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [feedbackContext, setFeedbackContext] = useState('');
    const [feedbacks, setFeedbacks] = useLocalStorage<Feedback[]>('feedbacks', []);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    
    // Admin password from environment variable (set in Replit Secrets) with fallback default
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'hatzalah2024';
    const HEBREW_ALPHABET = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'];

    const allDataMap = useMemo(() => {
        const map = new Map<string, SearchableItem>();
        allData.forEach(item => map.set(item.id, item));
        return map;
    }, [allData]);

    // Hebrew name aliases for medications (to handle spelling variations)
    const medicationAliases: Record<string, string[]> = {
        'med1': ['אפינפרין', 'אפינפרן', 'אפיפן'], // אדרנלין
        'med-amiodarone': ['אמיודארון'], // אמיודרון
        'med5': ['אטרופין סולפט'], // אטרופין
        'med-midazolam': ['דורמיקום', 'מידזולם'], // דורמיקום
        'med-salbutamol': ['סלבוטמול', 'סלבטמול'], // ונטולין
        'med-sodium-bicarb': ['ביקרבונט', 'סודיום ביקרב', 'NaHCO3'], // סודיום ביקרבונט
        'med-fentanyl': ['פנטניל סיטראט'], // פנטניל
        'med-ketamine': ['קטלאר'], // קטמין
        'med-tranexamic-acid': ['הקסאקאפרון', 'טרנקסמיק', 'TXA'], // הקסאקפרון
        'med-glucose': ['דקסטרוז', 'גלוקוז 50%', 'גלוקוזה', 'גלוקוז', 'D10W', 'D25W', 'D50W'], // גלוקוז
        'med-morphine': ['מורפין סולפט'], // מורפין
        'med-naloxone': ['נלוקסון'], // נרקאן
        'med-magnesium': ['מגנזיום', 'MgSO4'], // מגנזיום סולפט
        'med-methylprednisolone': ['מתילפרדניזולון'], // סולומדרול
        'med-furosemide': ['לאסיקס', 'פורוסמיד'], // פוסיד
        'med-dopamine': ['דופאמין'], // דופמין
        'med-paracetamol': ['אקמול', 'פראצטמול', 'אצטמינופן'], // אקמול
        'med-aspirin': ['חומצה אצטילסליצילית'], // אספירין
        'med-adenosine': ['אדנוסין'], // אדנוזין
        'med-heparin': ['הפארין'], // הפרין
        'med-ipratropium': ['איפרטרופיום', 'אטרוונט'], // אירובנט
        'med-calcium-gluconate': ['סידן גלוקונאט', 'קלציום'], // קלציום גלוקונאט
    };

    // Hebrew name aliases for procedures (to handle variations)
    const procedureAliases: Record<string, string[]> = {
        'proc_intubation': ['אינטובציה אנדוטראכיאלית', 'הנשמה מלאכותית', 'צנרור קנה', 'צנרור', 'RSI'],
        'proc_lma': ['LMA', 'מסכה לרינגיאלית', 'נתיב אוויר על-גלוטי', 'נתיב על-גלוטי'],
        'proc_cricothyrotomy': ['קוניוטומיה', 'קריקו', 'חיתוך קריקו-תירואידי'],
        'proc_cpap_connect': ['CPAP', 'סי-פאפ'],
        'proc_needle_thoracotomy': ['ניקור חזה', 'דקירת חזה', 'פירוק פנאומותורקס'],
        'proc_lucas': ['לוקאס', 'מכשיר עיסויים'],
        'proc_io': ['IO', 'עירוי תוך גרמי', 'BIG', 'NIO', 'גישה תוך-גרמית'],
        'proc_pacing': ['קוצב', 'קיצוב'],
        'proc_fdp': ['FDP', 'פלזמה'],
        'proc_flow_selector': ['בורר זרימה'],
        'proc_hydroxocobalamin': ['הידרוקסוקובלמין', 'ציאנוקיט', 'Cyanokit'],
        'proc_epipen': ['אפיפן', 'מזרק אדרנלין'],
        'proc_hemostatic': ['חבישה המוסטתית', 'פקינג', 'Packing'],
        'proc_pelvic_binder': ['חגורת אגן', 'מקבע אגן'],
        'proc_tourniquet': ['טורניקט', 'חסם עורקי', 'CAT'],
    };

    const { drugProtocolMap, medicationNames, procedureNames } = useMemo(() => {
        const map = new Map<string, string[]>();
        
        // Create medication names with aliases
        const medNames: LinkableItem[] = medications.map(med => {
            const match = med.name.match(/(.+?)\s*\((.+?)\)/);
            return {
                id: med.id,
                name: med.name,
                hebrewName: match ? match[1].trim() : med.name,
                aliases: medicationAliases[med.id] || [],
                type: 'medication' as const,
            };
        });
        
        // Create procedure names with aliases
        const procNames: LinkableItem[] = procedures.map(proc => {
            // Extract Hebrew name (before parentheses if any)
            const match = proc.name.match(/(.+?)\s*\((.+?)\)/);
            return {
                id: proc.id,
                name: proc.name,
                hebrewName: match ? match[1].trim() : proc.name,
                aliases: procedureAliases[proc.id] || [],
                type: 'procedure' as const,
            };
        });

        protocols.forEach(protocol => {
            protocol.content.forEach(section => {
                section.points.forEach(point => {
                    medNames.forEach(med => {
                        const escapedHebrewName = med.hebrewName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const hebrewRegex = new RegExp(`\\b${escapedHebrewName}\\b`, 'g');
                        if (hebrewRegex.test(point)) {
                            const existing = map.get(med.id) || [];
                            if (!existing.includes(protocol.id)) {
                                map.set(med.id, [...existing, protocol.id]);
                            }
                        }
                    });
                });
            });
        });
        return { drugProtocolMap: map, medicationNames: medNames, procedureNames: procNames };
    }, [medications, protocols, procedures]);


    const { adultProtocols, pediatricProtocols } = useMemo(() => {
        const adult: Protocol[] = [];
        const pediatric: Protocol[] = [];

        protocols.forEach(p => {
            if (p.category === 'ילדים' || p.category === 'יילודים') {
                pediatric.push(p);
            } else {
                adult.push(p);
            }
        });

        const groupByCategory = (protoList: Protocol[]) => {
            const groups = protoList.reduce((acc, protocol) => {
                const category = protocol.category;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(protocol);
                return acc;
            }, {} as Record<string, Protocol[]>);
            
            for (const category in groups) {
                groups[category].sort((a, b) => a.name.localeCompare(b.name, 'he'));
            }
            return groups;
        };

        return {
            adultProtocols: groupByCategory(adult),
            pediatricProtocols: groupByCategory(pediatric),
        };
    }, [protocols]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return [];
        const lowercasedTerm = searchTerm.toLowerCase();
        return allData.filter(item =>
            item.name.toLowerCase().includes(lowercasedTerm) ||
            ('indication' in item && item.indication.toLowerCase().includes(lowercasedTerm)) ||
            ('category' in item && item.category.toLowerCase().includes(lowercasedTerm)) ||
            ('summary' in item && item.summary.toLowerCase().includes(lowercasedTerm))
        );
    }, [searchTerm, allData]);

    const filteredMeds = useMemo(() => {
        const sortedMeds = [...medications].sort((a, b) => a.name.localeCompare(b.name, 'he'));
        if (!medFilterLetter) return sortedMeds;
        return sortedMeds.filter(med => med.name.startsWith(medFilterLetter));
    }, [medFilterLetter, medications]);

    const handleSelectItem = (item: SearchableItem) => {
        setSelectedItem(item);
        if (mainRef.current) {
            mainRef.current.scrollTop = 0;
        }
    };
    
    // Determine if we are in a sub-screen that should have a back button
    const isToolSubScreen = TOOL_SCREENS.includes(activeScreen);
    const isAdminScreen = activeScreen === 'admin';
    const showBackButton = isToolSubScreen || isAdminScreen || selectedItem !== null;
    const headerTitle = getScreenTitle(activeScreen);

    const handleBack = () => {
        if (selectedItem) {
            setSelectedItem(null);
            return;
        }
        
        if (isToolSubScreen) {
            setActiveScreen('tools');
            return;
        }

        if (isAdminScreen) {
            setActiveScreen('home');
            return;
        }
    };
    
    const handleNavClick = (screen: Screen) => {
        setActiveScreen(screen);
        setSearchTerm('');
        setSelectedItem(null);
        setProtocolNavState({ level: 'main' });
        // Reset Med filter when navigating away or back to meds
        if (screen === 'meds') setMedFilterLetter(null);

        if (mainRef.current) {
            mainRef.current.scrollTop = 0;
        }
    };

    const handleReportFeedback = (context: string) => {
        setFeedbackContext(context);
        setIsFeedbackOpen(true);
    };

    const handleSubmitFeedback = (message: string) => {
        const newFeedback: Feedback = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('he-IL'),
            context: feedbackContext,
            message,
            resolved: false
        };
        setFeedbacks(prev => [newFeedback, ...prev]);
    };

    const handleResolveFeedback = (id: string) => {
        setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, resolved: true } : f));
    };

    const handleDeleteFeedback = (id: string) => {
        setFeedbacks(prev => prev.filter(f => f.id !== id));
    };

    const handleAdminLogin = (password: string) => {
        if (password === ADMIN_PASSWORD) {
            setIsAdminAuthenticated(true);
            return true;
        }
        return false;
    };

    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        setActiveScreen('home');
    };

    const renderListView = () => {
        if (searchTerm) {
            return (
                <div className="p-4 space-y-3">
                    {filteredData.length > 0 ? filteredData.map(item => (
                        <ItemCard key={item.id} item={item} isFavorite={isFavorite(item.id)} onToggleFavorite={toggleFavorite} onClick={() => handleSelectItem(item)} />
                    )) : <p className="text-center text-slate-500 mt-8">לא נמצאו תוצאות.</p>}
                </div>
            );
        }

        switch (activeScreen) {
            case 'home': return <HomePage onAdminClick={() => handleNavClick('admin')} onNavigate={handleNavClick} />;
            case 'meds': return (
                <div className="p-4 animate-fade-in flex flex-col h-full">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white px-2 pb-4">כל התרופות</h1>
                    
                    {/* Alphabetical Filter Bar */}
                    <div className="flex overflow-x-auto gap-2 pb-4 mb-2 no-scrollbar px-1 flex-shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <button 
                            onClick={() => setMedFilterLetter(null)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full font-bold transition-all ${!medFilterLetter ? 'bg-uh-blue text-white shadow-md' : 'bg-white dark:bg-dark-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                        >
                            הכל
                        </button>
                        {HEBREW_ALPHABET.map(letter => (
                            <button 
                                key={letter}
                                onClick={() => setMedFilterLetter(letter)}
                                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all ${medFilterLetter === letter ? 'bg-uh-blue text-white shadow-md' : 'bg-white dark:bg-dark-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-24">
                        {filteredMeds.length > 0 ? (
                            filteredMeds.map((item, index) => 
                                <MedicationCard key={item.id} medication={item} onClick={() => handleSelectItem(item)} color={cardColors[index % cardColors.length]} />
                            )
                        ) : (
                             <div className="col-span-full text-center py-10 text-slate-400">
                                לא נמצאו תרופות באות זו
                             </div>
                        )}
                    </div>
                </div>
            );
            case 'protocols':
                switch (protocolNavState.level) {
                    case 'main':
                        return <ProtocolAgeGroupView onSelectAgeGroup={(ageGroup) => setProtocolNavState({ level: 'ageGroup', ageGroup })} />;
                    
                    case 'ageGroup':
                        const sourceData = protocolNavState.ageGroup === 'adult' ? adultProtocols : pediatricProtocols;
                        const title = protocolNavState.ageGroup === 'adult' ? 'פרוטוקולים - מבוגרים' : 'פרוטוקולים - ילדים';

                        return <ProtocolGridView
                            title={title}
                            protocolGroups={sourceData}
                            onBack={() => setProtocolNavState({ level: 'main' })}
                            onSelectItem={handleSelectItem}
                        />;
                    
                    default:
                        return null;
                }
            case 'procedures': return (
                <div className="p-4 space-y-3 animate-fade-in">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white px-2 pb-2">כל הפרוצדורות</h1>
                    {[...procedures].sort((a,b) => a.name.localeCompare(b.name, 'he')).map(item => <ItemCard key={item.id} item={item} isFavorite={isFavorite(item.id)} onToggleFavorite={toggleFavorite} onClick={() => handleSelectItem(item)} />)}
                </div>
            );
            case 'tools': return <ToolsMenu onNavigate={handleNavClick} />;
            case 'cpr': return <SmartCPRAssistant onSelectItem={handleSelectItem} allDataMap={allDataMap} />;
            case 'calc_gcs': return <GCSCalculator />;
            case 'calc_apgar': return <APGARCalculator />;
            case 'pedi_tape': return <PediatricTape />;
            case 'calc_avpu': return <AVPUCalculator />;
            case 'ref_tables': return <ReferenceTables />;
            case 'important_numbers': return <ImportantNumbers />;
            case 'info': return <AppInfo />;
            case 'favorites':
                const favoriteItems = allData.filter(item => favorites.includes(item.id));
                return (
                    <div className="p-4 space-y-3 animate-fade-in">
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white px-2 pb-2">מועדפים</h1>
                        {favoriteItems.length > 0 ? favoriteItems.map(item => (
                             <ItemCard key={item.id} item={item} isFavorite={isFavorite(item.id)} onToggleFavorite={toggleFavorite} onClick={() => handleSelectItem(item)} />
                        )) : <p className="text-center text-slate-500 mt-8">אין עדיין מועדפים.</p>}
                    </div>
                );
            case 'admin':
                return isAdminAuthenticated ? 
                    <AdminPanel 
                        feedbacks={feedbacks} 
                        onResolveFeedback={handleResolveFeedback} 
                        onDeleteFeedback={handleDeleteFeedback} 
                        onLogout={handleAdminLogout} 
                    /> : 
                    <AdminLogin onLogin={handleAdminLogin} />;
            default: return null;
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col font-sans text-slate-900 bg-slate-100 dark:bg-dark-bg transition-colors duration-300">
            <Header
                title={headerTitle}
                showBackButton={showBackButton}
                selectedItem={selectedItem}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onBack={handleBack}
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
                onFavoritesClick={() => handleNavClick('favorites')}
            />
            
            <main ref={mainRef} className="flex-grow overflow-y-auto pb-32">
                {selectedItem ? (
                    <DetailView 
                        item={selectedItem} 
                        isFavorite={isFavorite(selectedItem.id)} 
                        onToggleFavorite={toggleFavorite}
                        onSelectItem={handleSelectItem}
                        drugProtocolMap={drugProtocolMap}
                        medicationNames={medicationNames}
                        procedureNames={procedureNames}
                        allDataMap={allDataMap}
                        onReportFeedback={handleReportFeedback}
                    />
                ) : (
                    renderListView()
                )}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-card border-t border-slate-200 dark:border-slate-700 flex justify-around z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] pb-safe transition-colors duration-300">
                {NAV_ITEMS.map(({ screen, label, icon: Icon }) => {
                    const isActive = (activeScreen === screen || (screen === 'tools' && ['cpr', 'calc_gcs', 'calc_apgar', 'pedi_tape', 'calc_avpu', 'ref_tables', 'important_numbers'].includes(activeScreen))) && !searchTerm && !selectedItem;
                    return (
                        <button
                            key={screen}
                            onClick={() => handleNavClick(screen)}
                            className={`flex flex-col items-center justify-center pt-2.5 pb-2 w-full text-sm sm:text-base transition-colors border-t-2 ${isActive ? 'text-uh-orange border-uh-orange' : 'text-slate-500 dark:text-slate-300 hover:text-uh-orange dark:hover:text-uh-orange border-transparent'}`}
                        >
                            <Icon className="w-6 h-6 mb-1" />
                            <span>{label}</span>
                        </button>
                    );
                })}
            </nav>

            <FeedbackModal 
                isOpen={isFeedbackOpen} 
                onClose={() => setIsFeedbackOpen(false)} 
                context={feedbackContext} 
                onSubmit={handleSubmitFeedback} 
            />
        </div>
    );
}

export default function App() {
    return (
        <AdminDataProvider>
            <AppContent />
        </AdminDataProvider>
    );
}
