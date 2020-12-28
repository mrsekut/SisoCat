export type UserM = {
  id: UserId;
  name: string;
};

export type ProjectId = `project${number}`;
export type UserId = `user${number}`;
export type NoteId = `note${number}`;
export type LineId = `line${number}`;

// -------------------------------------------------------------------------------------
// Network Model
// -------------------------------------------------------------------------------------

export type NetworkM = {
  readonly projects: ProjectM[];
};

// -------------------------------------------------------------------------------------
// Project Model
// -------------------------------------------------------------------------------------

export type ProjectM = {
  readonly id: ProjectId;
  readonly name: string;
  readonly author: UserM;
  readonly notes: NoteId[];
};

// -------------------------------------------------------------------------------------
// Notes Model
// -------------------------------------------------------------------------------------

export type NotesM = Normalize<NoteId, NoteM>;
export type NoteM = {
  readonly id: NoteId;
  readonly author: UserM;
  readonly title: string;
  readonly created: number;
  readonly updated: number;
  readonly nodes: NodeM[];
  readonly references: NoteId[];
  readonly referenced: NoteId[]; // NOTE: 必要？
};

// -------------------------------------------------------------------------------------
// Node Model
// -------------------------------------------------------------------------------------

export type NodeM = BlokNodeM | LineNodeM;

// BlockNode
type BlockType = BlockM['type'];

export type BlokNodeM = {
  readonly type: 'block';
  readonly block: BlockM;
  readonly lines: LineNodeM[];
};

type BlockM =
  | {
      readonly type: 'code';
      readonly extension: ExtensionType;
    }
  | {
      readonly type: 'tex';
    };
type ExtensionType =
  | {
      readonly language: 'Haskell';
      readonly extension: '.hs';
    }
  | {
      readonly language: 'TypeScript';
      readonly extension: '.ts';
    };

// LineNode
export type LineNodeM = {
  readonly type: 'line';
  readonly line: LineM;
};

// -------------------------------------------------------------------------------------
// Line Model
// -------------------------------------------------------------------------------------

export type LineM = {
  readonly id: LineId;
  readonly lineIndex: number; // 持つ意味ある？
  readonly text: string;
  readonly indent: number;
  readonly nodes: NotationM[];
};

export type NotationType = NotationM['type'];
export type NotationM =
  | {
      readonly type: 'normal';
      readonly value: string;
    } // hoge
  | {
      readonly type: 'link';
      readonly value: string;
      readonly references: NoteId[];
    } // [hoge]
  | {
      readonly type: 'strong';
      readonly value: string;
      readonly level: 1 | 2 | 3 | 4 | 5 | 6;
    } // [** hoge]
  | {
      readonly type: 'redirect';
      readonly value: string;
      readonly references: NoteId[];
    } // [→ hoge]
  | {
      readonly type: 'expand';
      readonly value: string;
      readonly note: NoteId;
    } // [> hoge]
  | {
      readonly type: 'italic';
      readonly value: string;
    }
  | {
      readonly type: 'tex';
      readonly value: string;
    }
  | {
      readonly type: 'code';
      readonly value: string;
    } // [` hoge]
  | {
      readonly type: 'url';
      readonly value: string;
      readonly url: string;
    }; // [http://example.com hoge]

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------

type Normalize<K extends keyof any, V> = {
  byId: Record<K, V>;
  allIds: K[];
};

const keyBy = <T, K extends string | number, R extends { [key in keyof T]: T }>(
  arr: T[],
  key: (e: T) => K,
) => arr.reduce((acc, cur) => ({ ...acc, [key(cur)]: cur }), {} as R);
