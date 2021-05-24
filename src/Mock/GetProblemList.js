import Mock from "mockjs";

const { Random } = Mock;

Random.extend({
  difficulty() {
    const difficulty = ["difficult", "easy", "middle"];
    return this.pick(difficulty);
  },
});

const { array } = Mock.mock({
  "array|35-40": [
    {
      "id|+1": 0,
      "key|+1": 0,
      title: () => Random.title(3, 5),
      status: () => Random.natural(0, 2),
      difficulty: "@DIFFICULTY",
      acceptance: () => Random.float(0, 99, 2, 2),
    },
  ],
});

export default array;
