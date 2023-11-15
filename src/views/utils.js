import { saveAs } from 'file-saver';

export const splitIntoTopics = (text) => {
    // 假设每个议题都以"议题"开头，并且有一个明确的结束标记
    // 你需要根据实际文档的结构来调整这个函数
    const topicStart = '议题';
    const topics = text.split(new RegExp(`${topicStart}[一二三四五六七八九十]+：`));
    return topics.slice(1).map((topic, index) => `${topicStart}${index + 1}：${topic}`);
};

export const createWordDocument = (topicText, index) => {
    // 这里需要实现一个函数，用于创建Word文档
    // 并使用file-saver保存文件
    const header = '继续教育学院\n党政联席会会议纪要\n\n'; // 根据实际需要调整
    const footer = '\n参加人员：XXX、XX、XX\n列席人员：XX、XX、XXX、XXX\n记    录：XXX\n纪要整理：XXX\n\n发：院内各科室\n抄送：学校办公室\n继续教育学院办公室          2023年 10 月 23 日印发'; // 根据实际需要调整
    const fullText = `${header}${topicText}${footer}`;
    const blob = new Blob([fullText], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `Topic_${index}.docx`);
};

// const splitIntoTopics = (text) => {
//     // 这里需要实现一个函数，根据你的文档结构来分割文本
//     // 返回一个包含每个议题文本的数组
// };

// const createWordDocument = (topicText, index) => {
//     // 这里需要实现一个函数，用于创建Word文档
//     // 并使用file-saver保存文件
//     const blob = new Blob([topicText], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
//     saveAs(blob, `Topic_${index}.docx`);
// };