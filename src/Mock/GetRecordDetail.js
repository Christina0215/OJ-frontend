import mock from "mockjs";

const random = mock.Random;

const record = mock.mock({
  total: random.integer(25, 50),
  judgeResult: {
    id: random.integer(1, 11),
    alias: random.word(3, 5),
    en: random.word(),
    zh: random.cword(4),
    color: random.color(),
  },
  timeCost: random.integer(20, 2000),
  memoryCost: random.integer(1, 256),
  complieInfo: random.sentence(),
  language: {
    displayName: random.word(),
    extension: random.word(),
  },
  testcase: {
    testdataIndex: random.integer(1, 25),
    diff: random.paragraph(),
  },
  code: random.paragraph(),
  timeProportion: random.float(0, 0),
  memoryProportion: random.float(0, 0),
});

export default record;
