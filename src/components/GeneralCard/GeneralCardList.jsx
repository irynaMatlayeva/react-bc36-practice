import GeneralCardItem from './GeneralCardItem';

const GeneralCardList = ({ listData, isOpenMenu }) => {
  return (
    <ul>
      {listData.map(({ text }) => (
        <GeneralCardItem key={text} text={text} isOpenMenu={isOpenMenu} />
      ))}
    </ul>
  );
};

export default GeneralCardList;
