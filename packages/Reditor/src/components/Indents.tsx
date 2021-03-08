import React, { useState } from 'react';
import { Space } from './Space';
import { Triangle } from './Triangle';
import { Tooltip } from './Tooltip';
import { range, timeSince } from '../Shared/functions';

type Props = {
  level: number;
};

const dummyDate = new Date('2021/2/28 0:50:34').getTime();

export const Indents: React.VFC<Props> = ({ level }) => {
  const [isOpen, setOpen] = useState(true);

  if (level === 0) {
    return <></>;
  }

  return (
    <>
      {range(level - 1).map(_ => (
        <Space />
      ))}
      <Tooltip
        onClick={() => setOpen(e => !e)}
        text={`${timeSince(dummyDate)} ago`}
      >
        <Triangle isOpen={isOpen} />
      </Tooltip>
    </>
  );
};
