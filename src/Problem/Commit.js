import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import server from "../server";
import RecordModal from "./RecordModal";

export default ({ problemId, tabKey }) => {
  const [record, setRecord] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState({});

  useEffect(() => {
    const params = {
      offset: currentPage * 15,
      limit: 15,
    };
    server.get(`/problem/${problemId}/record`, { params }).then(({ data }) => {
      setTotal(data.total);
      setRecord(
        data.records
          ? data.records.map((record, index) => {
              record.index = index + 1;
              return record;
            })
          : []
      );
    });
  }, [tabKey, currentPage]);

  const showModal = item => {
    return {
      onClick: () => {
        setVisible(true);
        setParams({
          problemId,
          recordId: item.id,
        });
      },
    };
  };

  const closeModal = () => {
    setVisible(false);
  };

  const column = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Time Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "judgeResult",
      key: "judgeResult",
      render: judgeResult => <Tag color={judgeResult.color}>{judgeResult.en}</Tag>,
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: score => <span>{score}</span>,
    },
    {
      title: "Runtime",
      dataIndex: "timeCost",
      key: "timeCost",
      render: timeCost => <span>{timeCost + "ms"}</span>,
    },
    {
      title: "Memory",
      dataIndex: "memoryCost",
      keyt: "memoryCost",
      render: memoryCost => {
        return memoryCost >= 1024 ? <span>{memoryCost / 1024 + "mb"}</span> : <span>{memoryCost + "kb"}</span>;
      },
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: language => <span>{language.displayName}</span>,
    },
  ];

  const pagination = {
    pageSize: 15,
    onChange: page => {
      setCurrentPage(page - 1);
    },
    total,
  };

  return (
    <div>
      <Table columns={column} dataSource={record} rowKey="index" pagination={pagination} onRow={showModal} />
      <RecordModal visible={visible} cancel={closeModal} params={params} />
    </div>
  );
};
