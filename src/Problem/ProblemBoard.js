import React, { useEffect, useState } from "react";
import { Input, Table, Tag, Icon, Popover, Button, Divider } from "antd";
import store from "store";
import { Link } from "react-router-dom";
import ProblemTypes from "../Mock/GetProblemTags";
import ProblemSelector from "./ProblemSelector";
import CreactButton from "../Component/CreateButton";
import "./main.less";
import server from "../server";
import ConfirmButton from "../Component/ConfirmButton";

export default ({ history }) => {
  console.log(history)
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");

  const [problemData, setProblemData] = useState([]);
  useEffect(() => {
    const params = {
      offset: 15 * currentPage,
      limit: 15,
      keyword,
      status,
      type,
      difficulty,
      list: "normal",
    };
    server
      .get("/problem", { params })
      .then(response => {
        setProblemData(
          response.data.problems
            ? response.data.problems.map((problem, index) => {
                problem.index = index + 1;
                return problem;
              })
            : []
        );
        setTotal(response.data.total);
      })
      .catch(() => {
        // throw Error(`get problem occur a error ${error}`);
      });
  }, [search, difficulty, type, currentPage, status]);

  const PopoverCard = () => {
    const content = (
      <div>
        <p>
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          <span style={{ color: "green" }}>Accept</span>
        </p>
        <p>
          <Icon type="smile" theme="twoTone" twoToneColor="orange" />
          <span style={{ color: "orange" }}>Attempt</span>
        </p>
      </div>
    );
    return (
      <Popover content={content} title="status" placement="leftTop">
        <strong style={{ marginRight: 10 }}>status</strong>
        <Icon type="question-circle" style={{ color: "black" }} />
      </Popover>
    );
  };

  const deleteProblem = problemId => {
    return () => {
      server
        .delete(`/problem/${problemId}`)
        .then(() => {
          setSearch(search);
        })
        .catch(e => {
          console.error(e);
        });
    };
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title, record) => <Link to={`/problem/${record.id}`}>{title}</Link>,
    },
    {
      title: PopoverCard(),
      dataIndex: "status",
      key: "status",
      render: status => {
        if (status === 1) return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />;
        else if (status === 2) return <Icon type="smile" theme="twoTone" twoToneColor="orange" />;
        else return "";
      },
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      render: difficulty => {
        let color = "";
        if (difficulty === "difficult") color = "red";
        else if (difficulty === "middle") color = "orange";
        else color = "green";
        return <Tag color={color}>{difficulty}</Tag>;
      },
    },
    {
      title: "Acceptance",
      dataIndex: "acceptance",
      key: "acceptance",
      render: acceptance => {
        return <span>{`${acceptance}%`}</span>;
      },
    },
  ];

  if (store.get("auth") && store.get("auth").role.alias === "admin") {
    columns.push({
      title: "Operation",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <div>
            <ConfirmButton type="danger" size="small" clickHandler={deleteProblem(record.id)}>
              delete
            </ConfirmButton>
            <Divider type="vertical" />
            <Button type="primary" size="small" onClick={() => history.push(`/problem/modify/${record.id}`)}>
              modify
            </Button>
          </div>
        );
      },
    });
  }

  const pagination = {
    pageSize: 15,
    onChange: page => {
      setCurrentPage(page - 1);
    },
    total,
  };

  const selects = [
    { selectTpye: "Status", items: ["todo", "attemped", "done"], selected: status },
    { selectTpye: "Difficulty", items: ["easy", "middle", "difficult"], selected: difficulty },
    { selectTpye: "Types", items: ProblemTypes, selected: type },
  ];

  const onClick = ({ key }) => {
    selects.forEach(element => {
      if (element.items.includes(key)) {
        switch (element.selectTpye) {
          case "Status":
            setStatus(key === status ? "" : key);
            break;
          case "Difficulty":
            setDifficulty(key === difficulty ? "" : key);
            break;
          case "Types":
            setType(key === type ? "" : key);
            break;
          default:
        }
      }
    });
  };

  return (
    <div>
      <Input.Search
        placeholder="search problem title or id"
        onChange={e => {
          setKeyword(e.target.value);
        }}
        onSearch={value => {
          setSearch(value);
        }}
        className="search_input"
      />
      {selects.map(select => (
        <ProblemSelector key={select.selectTpye} click={onClick} {...select} />
      ))}
      <Table rowKey="index" columns={columns} dataSource={problemData} pagination={pagination} />
      {store.get("auth") && store.get("auth").role.roleId === 1 ? (
        <CreactButton
          clickHandler={() => {
            history.push(`/problem/create/new`);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
