import React, { useEffect, useState } from "react";
import { Table, Divider } from "antd";
import store from "store";
import { Link } from "react-router-dom";
import ProblemSelector from "./ProblemSelector";
import CreactButton from "../Component/CreateButton";
import "./main.less";
import server from "../server";
import ConfirmButton from "../Component/ConfirmButton";

export default ({ problemId, tabKey, history }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [language, setLanguage] = useState("");
  const [solution, setSolution] = useState([]);

  useEffect(() => {
    const params = {
      offset: 15 * currentPage,
      limit: 15,
      list: "normal",
      language,
    };
    server
      .get(`/problem/${problemId}/solution`, { params })
      .then(response => {
        setSolution(
          response.data.solutions
            ? response.data.solutions.map((solution, index) => {
              solution.index = index + 1;
              return solution;
            })
            : []
        );
        setTotal(response.data.total);
      })
      .catch(() => {
      });
  }, [language, currentPage, tabKey]);

  const deleteSolution = solutionId => {
    return () => {
      server
        .delete(`/problem/${problemId}/solution/${solutionId}`)
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
      render: (title, record) => <Link to={`/problem/${problemId}/solution/${record.id}`}>{title}</Link>,
    },
    {
      title: "Author",
      dataIndex: "user",
      key: "user",
      render: user => {
        return <span>{`${user}`}</span>;
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
            <ConfirmButton type="danger" size="small" clickHandler={deleteSolution(record.id)}>
              delete
            </ConfirmButton>
            <Divider type="vertical" />
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

  const selects = [{ selectTpye: "Language", items: ["C", "C++", "C#", "Go", "Javascript"], selected: language }];

  const onClick = ({ key }) => {
    selects.forEach(element => {
      if (element.items.includes(key)) {
        setLanguage(key === language ? "" : key);
      }
    })
  };

  return (
    <div>
      {selects.map(select => (
        <ProblemSelector key={select.selectTpye} click={onClick} {...select} />
      ))}
      <Table rowKey="index" columns={columns} dataSource={solution} pagination={pagination} />
      <CreactButton
        clickHandler={() => {
          history.push(`/problem/${problemId}/solution/create/new`);
        }}
      />
    </div>
  );
};
