function HotQuestions() {
  return (
    <div className="app-hot-questions">
      <div>
        <span>热门问题</span>
      </div>
      <div>
        <ul>
          <li>
            <p style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%'
            }}>What is a tag?</p>
            <p>1个回答</p>
          </li>
          <li>
            <p style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%'
            }}>What is reputation and how do I earn them?</p>
            <p>1个回答</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HotQuestions;
