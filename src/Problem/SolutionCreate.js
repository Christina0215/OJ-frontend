import React, { useState, useEffect } from "react";
import { Input, Select, PageHeader, Tooltip } from "antd";
import store from "store";
import ConfirmButton from "../Component/ConfirmButton";
import TextInput from "../Component/TextInput";
import server from "../server";

export default ({ match, solutionData, modifySolution }) => {
    const problemId = match.params.problemId;
    const [user, setUser] = useState("")
    const [solution, setSolution] = useState({
        title: "",
        language: "",
        content: "",
    });
    const [status, setStatus] = useState("create");
    useEffect(() => {
        server.get("/auth").then(r => {
            setUser(r.data.id);
        }).then(() => {
            if (solutionData && JSON.stringify(solutionData) !== "{}") {
                solutionData.samples = JSON.parse(solutionData.samples);
                setSolution(solutionData);
                setStatus("modify");
            }
        })
    }, [solutionData,user]);

    const language = ["C", "C++", "C#", "Go", "JavaScript"];
        return (
            <div className="create-problem-container">
                <PageHeader
                    title={status === "create" ? "You are creating a new Solution" : `You are modifying solution:${solution.title}`}
                    subTitle="Please fill in the following as required"
                    style={{
                        border: "1px solid rgb(235, 237, 240)",
                        width: "100%",
                    }}
                    extra={[
                        // <Tooltip placement="top" title="save and edit next time" key="save">
                        //   <Button
                        //     onClick={() => {
                        //       server.post(`/solution/${solution.id}`, { ...solution }).catch(e => console.error(e));
                        //     }}
                        //   >
                        //     Save
                        //   </Button>
                        // </Tooltip>,
                        <Tooltip placement="top" title="create it now" key="submit">
                            <span>
                                <ConfirmButton
                                    type="primary"
                                    clickHandler={() => {
                                        if (status === "create") {
                                            console.log(user);
                                            server.post(`/problem/${problemId}/solution`, { ...solution, user: user }).catch(error => {
                                                console.error(error);
                                            });
                                        } else {
                                            modifySolution(solution);
                                        }
                                    }}
                                >
                                    Submit
                </ConfirmButton>
                            </span>
                        </Tooltip>,
                    ]}
                />
                <div className="title">
                    <Input
                        size="large"
                        placeholder="Title"
                        value={solution.title}
                        onChange={e => {
                            setSolution({ ...solution, title: e.target.value });
                        }}
                    />
                </div>
                <div className="limit">
                    <Select
                        size="large"
                        className="child"
                        placeholder="Language"
                        defaultValue={solution.language}
                        onChange={language => {
                            setSolution({ ...solution, language });
                        }}
                    >
                        {language.map(item => (
                            <Select.Option key={item}>{item}</Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="content">
                    <TextInput
                        placehoder="Content"
                        onChange={content => setSolution({ ...solution, content })}
                        initValue={solution.content}
                    />
                </div>
            </div>
        );
};
