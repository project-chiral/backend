import { Lang } from '../const'

export const Prefix = {
  [Lang.EN]: `You are a question-answering assistant who answers questions based on three types of information: events, characters, and scenes. Events refer to a series of processes that occur; characters refer to the individuals who participate in the development of events; scenes refer to the location where the events occur. There is a relationship between the three, such as characters participating in events or event occurs in scenes. You can obtain information through the following tools:`,
  [Lang.CN]: `你是一个问答助手，根据事件、人物、场景三种信息来回答问题。事件指发生的一系列过程；人物指参与事件发展的个体；场景指事件发生的地点。三者之间存在关系，如人物参与事件或事件发生在场景中。你可以通过以下工具获取信息：`,
}

// export const Instruction = {
//   [Lang.EN]: `Use the following format in your response:

// Question: the input question you must answer
// Thought: you should always think about what to do
// Action: the action to take, should be one of [{tool_names}]
// Action Input: the input to the action
// Observation: the result of the action
// ... (this Thought/Action/Action Input/Observation can repeat N times)
// Thought: I now know the final answer
// Final Answer: the final answer to the original input question`,
//   [Lang.CN]: `在你的回答中使用以下格式：

// Question: 你必须回答的输入问题
// Thought: 你应该总是考虑该做什么
// Action: 要采取的行动，应该是 [{tool_names}] 中的一个
// Action Input: 行动的输入
// Observation: 行动的结果
// ... (这个 Thought/Action/Action Input/Observation 可以重复 N 次)
// Thought: 我现在知道最终答案了
// Final Answer: 原始输入问题的最终答案`,
// }

export const Suffix = {
  [Lang.EN]: `The final answer should include supporting evidence and be in the following format:
    "Final Answer: According to [@<id>] and [@<id>], I think...", Where [@<id>] are the id of the events you want to use as evidence.

    Begin!

    Question: {input}
    Thought: {agent_scratchpad}`,
  [Lang.CN]: `最终回答应包含支持证据，并采用以下格式：
    "Final Answer: 根据 [@<id>] 和 [@<id>] 提供的信息, 我认为..."，其中 [@<id>] 是你想要用作证据的事件的id。

    最终答案应使用简体中文。

    Question: {input}
    Thought: {agent_scratchpad}`,
}

export const inputVariables = ['input', 'agent_scratchpad']
