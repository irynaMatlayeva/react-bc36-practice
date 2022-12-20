import GeneralCardItem from './GeneralCardItem';
import { StyledList } from './GeneralCardItem.styled';

const GeneralCardList = ({ listData, deleteCard }) => {
  return (
    <StyledList>
      {listData.length > 0 &&
        listData.map(({ text, relation }) => (
          <GeneralCardItem
            id={text}
            key={text}
            relation={relation}
            text={text}
            deleteCard={deleteCard}
          />
        ))}
    </StyledList>
  );
};

export default GeneralCardList;
