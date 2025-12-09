
export enum ItemType {
  Medication = 'MEDICATION',
  Protocol = 'PROTOCOL',
  Procedure = 'PROCEDURE',
}

export interface Dosage {
  indication: string;
  dosePerKg?: number; // in mg (minimum dose per kg for range dosing)
  dosePerKgMax?: number; // in mg (maximum dose per kg for range dosing)
  fixedDose?: number; // in mg
  maxDose?: number; // in mg (absolute maximum dose)
  route: string;
  administrationNotes: string;
  // FIX: Add optional concentration property to allow dosage-specific concentrations.
  concentration?: number; // in mg/ml
}

export interface RelatedProtocol {
  id: string;
  name: string;
}

export interface Medication {
  id: string;
  name: string;
  indication: string;
  // FIX: Broaden the type from ItemType.Medication to ItemType to resolve a complex type inference issue.
  type: ItemType;
  concentration?: number; // in mg/ml
  notes: string;
  dosages: Dosage[];
  appearance?: string;
  packaging?: string;
  storage?: string;
  contraindications?: string[];
  category?: string;
  mechanismOfAction?: string;
  pharmacokinetics?: string;
  sideEffects?: string;
  administrationForms?: string;
  pregnancySafety?: string;
  relatedProtocols?: RelatedProtocol[];
}

export interface Protocol {
  id: string;
  name: string;
  category: string;
  summary: string;
  content: { title: string; points: string[] }[];
  type: ItemType.Protocol;
  source?: string;
}

export interface Procedure {
  id: string;
  name: string;
  summary: string;
  preparation: string[];
  steps: string[];
  contraindications: string[];
  indications?: string[];
  guidelines?: string[];
  complications?: string[];
  type: ItemType.Procedure;
}

export interface Feedback {
  id: string;
  date: string;
  context: string; // The name of the item or "General"
  message: string;
  resolved: boolean;
}

export interface AppUpdate {
  id: string;
  description: string;
}

export type SearchableItem = Medication | Protocol | Procedure;

export type Screen = 'home' | 'meds' | 'protocols' | 'procedures' | 'favorites' | 'admin' | 'tools' | 'cpr' | 'calc_gcs' | 'calc_apgar' | 'pedi_tape' | 'calc_avpu' | 'ref_tables' | 'info' | 'important_numbers';