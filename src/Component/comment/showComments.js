import React, { useState } from "react";
import { Comment, Avatar, Icon } from "antd";
import httpService from "../../server";

export default ({ children, comment }) => {
  console.log(comment);
  const [ifLike, setIfLike] = useState({ like: 0, dislike: 0 });
  // httpService.get("/", r => {
  //   setIfLike({ like: r.data });
  // });
  // httpService.get("/", r => {
  //   setIfLike({ dislike: r.data });
  // });
  return (
    <Comment
      actions={[
        <span>
          <Icon type="like" />
          <strong style={{ marginRight: 10 }}>like({ifLike.like})</strong>
        </span>,
        <span>
          <Icon type="dislike" />
          <strong style={{ marginRight: 10 }}>dislike({ifLike.like})</strong>
        </span>,
        <span key="comment-nested-reply-to">
          <a href="/">Reply to</a>
        </span>,
      ]}
      author={<a>Han Solo</a>}
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
      content={<p>{comment}</p>}
    >
      {children}
    </Comment>
  );
};
