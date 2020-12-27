export type UserM = {
  id: UserId;
  name: string;
};

export type ProjectId = `project${number}`;
export type UserId = `user${number}`;
export type NoteId = `note${number}`;
export type LineId = `line${number}`;

/**
 *
 * Network Model
 * =====================
 */
export type NetworkM = {
  projects: ProjectM[];
};

/**
 *
 * Project Model
 * =====================
 */
export type ProjectM = {
  id: ProjectId;
  name: string;
  author: UserM;
  notes: NoteId[];
};

/**
 *
 * Notes Model
 * =====================
 */
export type NotesM = Normalize<NoteId, NoteM>;
export type NoteM = {
  id: NoteId;
  author: UserM;
  title: NodeM;
  created: number;
  updated: number;
  nodes: NodeM[];
  references: NoteId[];
  referenced: NoteId[]; // NOTE: 必要？
};

/**
 *
 * Node Model
 * =====================
 */
export type NodeM = BlokNodeM | LineNodeM;

// BlockNode
type BlockType = BlockM['type'];

export type BlokNodeM = {
  type: 'block';
  block: BlockM;
  lines: LineNodeM[];
};

type BlockM =
  | {
      type: 'code';
      extension: ExtensionType;
    }
  | {
      type: 'tex';
    };
type ExtensionType =
  | {
      language: 'Haskell';
      extension: '.hs';
    }
  | {
      language: 'TypeScript';
      extension: '.ts';
    };

// LineNode
export type LineNodeM = {
  type: 'line';
  line: LineM;
};

/**
 *
 * Line Model
 * =====================
 */
export type LineM = {
  id: LineId;
  text: string;
  indent: number;
  nodes: NotationM[];
};

export type NotationType = NotationM['type'];
export type NotationM =
  | { type: 'normal'; value: string } // hoge
  | {
      type: 'link';
      value: string;
      references: NoteId[];
    } // [hoge]
  | {
      type: 'strong';
      value: string;
      level: 1 | 2 | 3 | 4 | 5 | 6;
    } // [** hoge]
  | {
      type: 'redirect';
      value: string;
      references: NoteId[];
    } // [→ hoge]
  | {
      type: 'expand';
      value: string;
      note: NoteId;
    } // [> hoge]
  | {
      type: 'italic';
      value: string;
    }
  | {
      type: 'tex';
      value: string;
    }
  | {
      type: 'code';
      value: string;
    } // [` hoge]
  | {
      type: 'url';
      value: string;
      url: string;
    }; // [http://example.com hoge]

/**
 * Utils
 * =====================
 */

type Normalize<K extends string, V> = {
  byId: {
    [id in K]: V;
  };
  allIds: K[];
};

const keyBy = <T, K extends string | number, R extends { [key in keyof T]: T }>(
  arr: T[],
  key: (e: T) => K,
) => arr.reduce((acc, cur) => ({ ...acc, [key(cur)]: cur }), {} as R);

/**
 * Cursor Position ?
 * もっと一般的なPositon?
 */
export type Position = {
  top: number;
  left: number;
};
