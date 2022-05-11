import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchModDetails, toggleFavourite } from "../../store/actions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart, AiFillTag } from "react-icons/ai";
import { format } from "date-fns";

export default function modDetails(props) {
    const router = useRouter();
    const modId = router.query.id || [];

    const modDetails = useSelector(
        (state) => state.globalState.currentModDetails
    );

    const favourites = useSelector((state) => state.globalState.favourites);

    const dispatch = useDispatch();

    useEffect(() => {
        if (modId.length > 0) {
            dispatch(fetchModDetails(modId));
        }
    }, [dispatch]);

    function handleClick() {
        dispatch(toggleFavourite(modId));
    }

    const {
        category,
        createdAt,
        fileSize,
        longDescription,
        owner,
        screenshots,
        subscriberCount,
        tags,
        title,
        updatedAt,
    } = modDetails ?? {};

    if (!modDetails) return <p>Loading...</p>;

    return (
        <PageContainer>
            <Header>
                <Link href="/" title="back">
                    <button>&#10096; Back</button>
                </Link>
                <Favourite
                    onClick={handleClick}
                    $isFavourite={favourites.includes(modId)}
                >
                    {favourites.includes(modId) ? (
                        <AiFillHeart />
                    ) : (
                        <AiOutlineHeart />
                    )}
                </Favourite>
            </Header>
            <ImageCarousel showThumbs={false}>
                {screenshots.map((image) => {
                    return (
                        <div>
                            <img src={image.url} />
                        </div>
                    );
                })}
            </ImageCarousel>
            <Titles><h1>{title}</h1><h3>By {owner.displayName}</h3></Titles>
            <Ribbon $bg="dark">
                <div>
                    <span>subs</span>
                    <span>{subscriberCount}</span>
                </div>
                <div>
                    <span>category</span>
                    <span>{category}</span>
                </div>
                <div>
                    <span>size</span>
                    <span>{fileSize} kb</span>
                </div>
            </Ribbon>
            <Tags $bg="yellow">
                {tags.map((tag) => (
                    <Tag>
                        <AiFillTag />
                        {tag.name}
                    </Tag>
                ))}
            </Tags>
            <ModDetails>{longDescription}</ModDetails>
            <Dates>
                <div>
                    Created:{" "}
                    <span>{format(new Date(createdAt), "yyyy-MM-dd")}</span>
                </div>
                <div>
                    Updated:{" "}
                    <span>{format(new Date(updatedAt), "yyyy-MM-dd")}</span>
                </div>
            </Dates>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    max-width: 700px;
    margin: auto;
    min-height: 100vh;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`;

const Favourite = styled.button`
    border: 1px solid ${(props) => props.theme.text};
    border-radius: 50%;
    line-height: 0;
    padding: 0;
    width: 30px;
    height: 30px;

    svg {
        color: ${(props) =>
            props.$isFavourite ? props.theme.accent : props.theme.text};
        height: 20px;
        width: 20px;
    }
`;

const ImageCarousel = styled(Carousel)`
    margin: auto;
`;

const Titles = styled.section`
    text-align: center;
    padding: 1rem 2rem;

    h1, h3 {
      margin: 0;
    }
    
    h1 {
      font-size: 2rem;
      padding-bottom: 0.5rem;
    }

`;


const Ribbon = styled.section`
    background: ${(props) =>
        props.$bg === "yellow" ? props.theme.accent : props.theme.text};
    color: ${(props) => (props.$bg === "yellow" ? props.theme.text : "#fff")};
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      span:first-child {
        font-weight: bold;
        padding-bottom: 0.3125rem;
      }
    }
    `;

const Tags = styled(Ribbon)`
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    `;

const Tag = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid ${(props) => props.theme.text};
    border-radius: 10px;
    padding: 0.5rem;
    text-transform: lowercase;
    `;

const ModDetails = styled.section`
    padding: 1rem 2rem;
    padding-bottom: 3rem;
`;

const Dates = styled.section`
    display: flex;
    gap: 2rem;
    padding: 1rem 2rem;
    border-top: 1px solid ${(props) => props.theme.text};

    
    div {
      display: flex;
      flex-direction: column;
      font-weight: 600;

      span {
        font-weight: 400;
      }
    }
`;
