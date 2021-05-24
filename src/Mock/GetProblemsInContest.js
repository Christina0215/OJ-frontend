import Mock from "mockjs";

Mock.Random.extend({
  constellation() {
    const difficulty = ["difficult", "middle", "easy"];
    return this.pick(difficulty);
  },
});

const { array } = Mock.mock({
  "array|35-40": [{ "id|+1": 0, title: () => Mock.Random.title(3), difficulty: () => Mock.mock("@constellation") }],
});

export default array;
