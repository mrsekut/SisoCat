import React from 'react';
import styled, { x } from '@xstyled/styled-components';
import { NoteId } from 'app/models/notes/typings/note';
import { Reditor } from '../Reditor';

type Props = {
  noteIds: NoteId[];
};

export const Reditors: React.FC<Props> = ({ noteIds }) => {
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
  background-color: blue;

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
  background-color: green;
`;
