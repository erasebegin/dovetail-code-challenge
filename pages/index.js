import { useState, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
//REDUX
import { useSelector, useDispatch } from "react-redux";
import { fetchModList } from "../store/actions";
import Card from "../components/Card";

export default function Home() {
    const mods = useSelector((state) => state.globalState.modList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchModList({ pageSize: 10 }));
    }, [dispatch]);

    console.log({ mods });

    if (mods.length <= 0) return <p>Loading...</p>;

    return (
        <>
            <Head>
                <title>TSW2 Mod Index</title>
                <meta
                    name="description"
                    content="Train Sim World 2 Mod Search"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <PageContainer>
                <h1>TSW2 Mod Index</h1>
                <CardsContainer>
                    {mods?.map((modData, index) => {
                        return (
                            <Card
                                key={`user-mod-${index}`}
                                cardData={modData}
                            />
                        );
                    })}
                </CardsContainer>
            </PageContainer>
        </>
    );
}

const PageContainer = styled.main`
    max-width: 700px;
    margin: auto;

    h1 {
        text-align: center;
        padding: 2rem;
    }
`;

const CardsContainer = styled.section`
    display: grid;
    grid-gap: 1.5rem;
    padding: 2rem 1rem;

    @media (min-width: 600px) {
        grid-template-columns: 1fr 1fr;
    }
`;
