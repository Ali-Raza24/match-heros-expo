import { IGame } from "../../../utils/types";

type Props = {
    gameId: string;
    creatorId: string;
    gameStatus: string
}

export const HomeAndAwayTeamList: (props: Props) => JSX.Element;