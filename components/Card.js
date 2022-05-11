import Link from "next/link";
import styled from "styled-components";
import { AiFillCamera } from "react-icons/ai";

export default function Card({ cardData }) {
    const { id, shortDescription, owner, thumbnail, tags, title } =
        cardData ?? {};

    function ellipsize(string, maxLength = 20) {
        const wordArr = string.split(" ");

        if (wordArr.length > maxLength) {
            return wordArr.slice(0, maxLength).join(" ").concat("...");
        }

        return string;
    }

    return (
        <Link href={`/mod-details/${id}`} title={title}>
            <StyledCard>
                <CardTop $hasThumbnail={thumbnail}>
                    <img src={thumbnail} alt={title} />
                    <AiFillCamera />
                </CardTop>
                <CardBottom>
                    <div>
                        <h3>{title}</h3>
                        <h4>by {owner.displayName}</h4>
                        <p>{ellipsize(shortDescription, 15)}</p>
                    </div>
                    <Tags>{tags.slice(0,4).map((tag)=><span>{tag.name}</span>)}</Tags>
                </CardBottom>
            </StyledCard>
        </Link>
    );
}

const StyledCard = styled.div`
    width: 300px;
    height: 400px;
    overflow: hidden;
    margin: auto;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 10px #30303033;
`;

const CardTop = styled.div`
    height: 50%;
    background: #ebebeb;
    position: relative;

    img {
        height: 100%;
        object-fit: cover;
        max-width: 300px;
        z-index: 1;
    }

    svg {
        display: ${(props) => (props.$hasThumbnail ? "none" : "initial")};
        position: absolute;
        top: 50%;
        left: 50%;
        height: 50px;
        width: 50px;
        transform: translate(-50%, -50%);
        color: ${(props) => props.theme.text};
        z-index: 0;
    }
`;

const CardBottom = styled.div`
    padding: 1rem;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
        line-height: 1.2rem;
        margin-bottom: 0.125rem;
    }

    h4 {
        margin: 0;
        padding-bottom: 0.5rem;
        font-weight: 400;
        font-size: 0.8rem;
    }

    p {
        margin: 0;
    }
`;

const Tags = styled.div`
  text-transform: lowercase;
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  overflow: hidden;

  span {
      background: ${props => props.theme.accent};
      border-radius: 10px;
      padding: 0.3125rem;
      font-size: 12px;
      white-space: nowrap;
      color: white;
      font-weight: 600;
  }
`;
