export const useGetNote = (noteId: number) => {
  // const note = makeRelDict(texts)[noteId];
  // const [note] = useQuery(getNote, { where: { id: 1 } });
  // const [user] = useQuery(getUser, { where: { id: note.userId } });
  // const { textWidths } = useTextWidths();
  // const lines = note.lines
  //   .split('\n')
  //   .map(line => ({ value: line, widths: textWidths(line) }));
  // return {
  //   ...note,
  //   author: {
  //     id: 'user1',
  //     name: 'mrsekut',
  //   },
  //   lines,
  // };
};

// for debeug
export const useAllLoad = () => {
  // const dict = makeRelDict(texts);
  // const { textWidths } = useTextWidths();
  // const allLoad = useCallback((): NoteM[] => {
  //   return Object.values(dict).map(note => {
  //     const lines = note.lines
  //       .split('\n')
  //       .map(line => ({ value: line, widths: textWidths(line) }));
  //     return {
  //       ...note,
  //       author: {
  //         id: 'user1',
  //         name: 'mrsekut',
  //       },
  //       lines,
  //     };
  //   });
  // }, []);
  // return { allLoad };
};
