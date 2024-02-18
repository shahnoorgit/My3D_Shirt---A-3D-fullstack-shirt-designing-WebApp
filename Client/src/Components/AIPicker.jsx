import Customebtn from "./Customebtn";

const AIPicker = ({ generatingimg, prompt, setprompt, handleSumbit }) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        rows={5}
        value={prompt}
        placeholder="Ask AI"
        onChange={(e) => setprompt(e.target.value)}
      />
      <div className=" flex flex-wrap gap-3">
        {generatingimg ? (
          <Customebtn
            type="outline"
            title="Asking AI"
            customeStyles="text-xs"
          />
        ) : (
          <>
            <Customebtn
              type="outline"
              title="AI Logo"
              customeStyles="text-xs"
              handleClick={() => handleSumbit("logo")}
            />
            <Customebtn
              type="filled"
              title="AI Full"
              customeStyles="text-xs"
              handleClick={() => handleSumbit("full")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
