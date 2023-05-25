interface IInvitedPlayers {
    id: number,
    player_id: number,
    player_name: string,
    status: "accepted" | "rejected"
}

type Props = {
    data: IInvitedPlayers[];
    creatorId: string;
    onPress: () => void;
};
export const TeamCard: (props: Props) => JSX.Element;