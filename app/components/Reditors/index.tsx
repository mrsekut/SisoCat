import React, { useCallback, useEffect } from 'react';
import styled from '@xstyled/styled-components';
import { NoteId } from 'app/models/notes/typings/note';
import { Reditor } from '../Reditor';
import { notesS, useNotes } from 'app/models/notes';
import { useAllLoad } from 'app/models/notes/hooks/useGetNote';
import { NoteM } from 'app/models/notes/typings';
import { useRecoilState, useSetRecoilState } from 'recoil';

type Props = {
  noteId: NoteId;
};

export const Reditors: React.FC<Props> = ({ noteId }) => {
  const { allLoad } = useAllLoad();
  const setNotes = useSetRecoilState(notesS);
  const initNotes = useCallback((notes: NoteM[]) => {
    const dic = notes.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
    setNotes(dic);
  }, []);

  useEffect(() => {
    initNotes(allLoad());
  }, []);

  return (
    <Container>
      <Col>
        <Row>
          <Reditor noteId={0} />
        </Row>
        <Row>
          <Reditor noteId={1} />
        </Row>
      </Col>

      <Col>
        <Row>
          <Reditor noteId={2} />
        </Row>
        <Row>
          <Reditor noteId={3} />
        </Row>
      </Col>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;

  > div {
    flex: 1;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    flex: 1;
    overflow: scroll;
  }
`;

const Row = styled.div`
  padding: 5px;
  background-color: #defade;
`;
