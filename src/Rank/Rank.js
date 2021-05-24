import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { Link } from "react-router-dom";
import server from "../server";

export default () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");

  const [rankData, setRankData] = useState([]);
  useEffect(() => {
    const params = {
      offset: 15 * currentPage,
      limit: 15,
      keyword,
      list: "normal",
    };
    server
      .get("/rank", { params })
      .then(response => {
        setRankData(
          response.data.users
            ? response.data.users.map((user, index) => {
                user.index = index + 1;
                return user;
              })
            : []
        );
        setTotal(response.data.total);
      })
      .catch(() => {
        // throw Error(`get problem occur a error ${error}`);
      });
  }, [search, currentPage]);

  const columns = [
    {
      title: "Rank",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (name, record) => <Link to={`/rank/${record.id}`}>{name}</Link>,
    },
    {
      title: "PassRate",
      dataIndex: "passrate",
      key: "passrate",
      render: passrate => {
        return <span>{`${passrate.toFixed(2)}%`}</span>;
      },
    },
    {
      title: "Solved",
      dataIndex: "solved",
      key: "solved",
      render: solved => {
        return <span>{`${solved}`}</span>;
      },
    },
  ];

  const pagination = {
    pageSize: 15,
    onChange: page => {
      setCurrentPage(page - 1);
    },
    total,
  };
  console.log(rankData);
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
      <Table rowKey="index" columns={columns} dataSource={rankData} pagination={pagination} />
    </div>
  );
};
