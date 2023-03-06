export interface Files {
    data: any;
    name: string;
}

export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Rotation {
    x: number;
    y: number;
    z: number;
    w: number;
}

export interface Stats {
    Health: number;
    Anger: number;
    Fear: number;
    Fullness: number;
    Hydration: number;
    Energy: number;
    Affection: number;
}

export interface Actor {
    UniqueId: number;
    TypeId: number;
    FamilyId: number;
    Position: Position;
    Rotation: Rotation;
    SpawnerId: number;
    ActorSeed: number;
    VariationId: number;
    State: number;
    GraphMask: number;
    EquippedItems: number[];
    OutfitId: number;
    NextGiftTime: number;
    LastVisitTime: number;
    Stats: Stats;
    StateFlags: number;
}


