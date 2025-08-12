//
export type FinalFormDataType = {
  auszugort?: AuszugortType;
  einzugort?: EinzugortType;
  customer?: Customer;
};

//
// First step form data type
export type AuszugortType = {
  plz?: string;
  street?: string;
  streetNumber?: string;
  ausZugAus: {
    homeType?: "wohnung" | "haus" | "zimmer"; // radio group
    livingSpace?: string; // input max 4
    rooms?: string; // select
    floor?: string; // select
    degreeOfFurnishing?: "low" | "mid" | "high"; // radio group
    storageAreas?: string; // input max 4
  };
  laufweg: {
    elevatorAvailable?: "yes" | "no"; // radio
    parkzone?: string; //select
  };
  zusatzleistungen: {
    packing?: boolean;
    dismantlingFurniture?: boolean;
    dismantlingKitchen?: boolean;
    provisionBoxes?: boolean;
    storageFurniture?: boolean;
    disposalFurniture?: boolean;
    finalCleaning?: boolean;
    furnitureLift?: boolean;
    establishParkingZone?: boolean;
  };
};

//
// Second step form data type
export type EinzugortType = {
  plz?: string;
  street?: string;
  streetNumber?: string;
  ausZugIn: {
    homeType?: "wohnung" | "haus" | "zimmer"; // radio group
    floor?: string; // select
  };
  laufweg: {
    elevatorAvailable?: "yes" | "no"; // radio
    parkzone?: string; //select
  };
  zusatzleistungen: {
    packing?: boolean;
    dismantlingFurniture?: boolean;
    dismantlingKitchen?: boolean;
    connectingWashingMachine?: boolean;
    drillingDowelingWork?: boolean;
    furnitureLift?: boolean;
    establishParkingZone?: boolean;
  };
};

export type Customer = {
  phoneOrEmail: string;
};
