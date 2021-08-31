import React from "react";

type TimeDiff = {
  sec: number;
  min: number;
  hour: number;
  date: number;
};

const getTimeDiff = (diffMs: number): TimeDiff => {
  const diffSec = Math.floor(diffMs / 1000);
  const sec = (diffMs % 60000) / 1000;
  const min = Math.floor(diffSec / 60) % 60;
  const hour = Math.floor(diffSec / 3600) % 24;
  const date = Math.floor(diffSec / 86400);
  return { date, hour, min, sec };
};

const profile = (
  <div>
    統合開発環境 (
    <a
      href="https://twitter.com/sadnessOjisan"
      target="_blank"
      rel="noopener noreferrer"
    >
      @sadnessOjisan
    </a>
    ) さんが
  </div>
);
const subject = "統合開発環境 (@sadnessOjisan) さんが";

const SrOnly = (props: { text: string }) => (
  <div className="sr-only" role="timer" aria-live="polite" aria-atomic="true">
    {props.text}
  </div>
);
const ShareOnTwitter = (props: { tweetText: string }) => {
  return (
    <div className="flex justify-center">
      <a
        href={`https://twitter.com/intent/tweet?hashtags=syusyoku_20210901&text=${props.tweetText}"&url=https://employment-ojisan.vercel.app/`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center flex-col"
        title="Share on Twitter"
      >
        <div
          className="h-10 w-10 bg-gray-700"
          style={{
            WebkitMask: `url(/images/twitter.svg) no-repeat center / contain`,
          }}
        />
        シェアする
      </a>
    </div>
  );
};

type Props = {
  msFromTarget: number;
};
const CountDown: React.FC<Props> = ({ msFromTarget }) => {
  const { sec, min, hour, date } = getTimeDiff(Math.abs(msFromTarget));

  if (msFromTarget >= 0 && msFromTarget < 10000) {
    const syusyokuNow = [
      ...new Array(Math.floor((msFromTarget / 1000 + 1) ** 1.5)),
    ]
      .map(() => "就職！")
      .join("");
    const justSyusyokuText = `${subject}${syusyokuNow}しました。`;
    return (
      <>
        <div aria-hidden="true">
          {profile}
          <img
            src={`/images/message_syusyoku_omedetou.png`}
            className="fixed left-0 top-0 z-[-1] object-contain opacity-50 w-screen h-screen"
          />
          <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold leading-none text-red-500">
            {syusyokuNow}
          </div>
          <div>しました。</div>
        </div>
        <ShareOnTwitter tweetText={justSyusyokuText} />
        <SrOnly text={justSyusyokuText} />
      </>
    );
  }
  const isBefore = msFromTarget < 0;
  const preText = `就職${isBefore ? "するまで、あと" : "してから"}`;
  const time = `${date}日${hour}時間${min}分${sec.toFixed(3)}秒`;
  const noSecTime = `${date}日${hour}時間${min}分`;
  const postText = `${isBefore ? "です" : "経ちました"}。`;
  const tweetText = `${subject}${preText}${time}${postText}`;
  const srText = `${subject}${preText}${noSecTime}${postText}`;
  const imgSrc = `/images/${
    isBefore ? "syusyoku_nayamu_neet_man.png" : "message_syusyoku_omedetou.png"
  }`;
  return (
    <>
      <div aria-hidden="true">
        <img
          src={imgSrc}
          className="fixed left-0 top-0 z-[-1] object-contain opacity-25 w-screen h-screen"
        />
        {profile}
        <div>{preText}</div>
        <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold leading-snug">
          {time}
        </div>
        <div>{postText}</div>
      </div>
      <ShareOnTwitter tweetText={tweetText} />
      <SrOnly text={srText} />
    </>
  );
};

export default CountDown;
