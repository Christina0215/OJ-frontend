import React, { useState } from "react";
import { Table, Transfer, Tag, Input, Button } from "antd";
import { cloneDeep } from "lodash";

export default ({ targetItems, setTargetItems, ...restProps }) => {
  const [targetKeys, setTargetKeys] = useState([]);

  const leftColumns = [
    {
      title: "Title",
      render: item => (
        <Button
          type="link"
          title={item.title}
          onClick={() => {
            window.open(`/problem/${item.id}`);
          }}
        >
          {item.title}
        </Button>
      ),
      ellipsis: true,
    },
    {
      dataIndex: "difficulty",
      title: "Difficulty",
      render: difficulty => <Tag>{difficulty}</Tag>,
    },
  ];

  const InputItem = (changeHandler, attr, key) => (
    <Input
      size="small"
      style={{ width: "80%" }}
      onClick={e => e.stopPropagation()}
      placeholder={attr}
      value={targetItems.find(item => item.key === key)[attr]}
      onChange={e => changeHandler(e, attr)}
    />
  );

  const handleSingle = key => {
    return (e, attr) => {
      const source = cloneDeep(targetItems);
      source.find(item => item.key === key)[attr] = parseInt(e.target.value || 0, 10);
      setTargetItems(source);
    };
  };

  const handleAll = (e, attr) => {
    const source = cloneDeep(targetItems);
    source.forEach(item => {
      item[attr] = parseInt(e.target.value || 0, 10);
    });
    setTargetItems(source);
  };

  const rightColumns = [
    {
      title: "Title",
      render: item => (
        <Button
          type="link"
          title={item.title}
          onClick={() => {
            window.open(`/problem/${item.id}`);
          }}
        >
          {item.title}
        </Button>
      ),
      ellipsis: true,
    },
    {
      title: "Score",
      render: item => InputItem(handleSingle(item.key), "score", item.key),
    },
    {
      title: "Order",
      render: item => InputItem(handleSingle(item.key), "order", item.key),
    },
  ];

  const TransferHead = () => {
    const rightHead = (
      <div>
        <span>Unified score setting: </span>
        <div>
          <Input.Group compact>
            <Input placeholder="score" onChange={e => handleAll(e, "score")} />
          </Input.Group>
        </div>
      </div>
    );
    return ["", rightHead];
  };

  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
    const source = restProps.dataSource.filter(({ key }) => nextTargetKeys.includes(key));
    source.forEach((item, index, arr) => {
      targetItems.forEach(preItem => {
        if (item.key === preItem.key) {
          arr[index] = cloneDeep(preItem);
        }
      });
    });
    console.log(source);
    setTargetItems(source);
  };
  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      onChange={onChange}
      showSelectAll={false}
      titles={TransferHead()}
      listStyle={() => ({
        width: "48%",
      })}
    >
      {({ direction, filteredItems, onItemSelect, selectedKeys: listSelectedKeys }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;
        const rowSelection = {
          getCheckProps: item => ({ disabled: item.disabled }),
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={direction === "right" ? targetItems : filteredItems}
            size="small"
            onRow={({ key }) => ({
              onClick: () => {
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
};
