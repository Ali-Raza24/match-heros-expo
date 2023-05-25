import { IBooking } from "../../../utils/types";

type Props = {
    booking: IBooking | null;
    game_fee: string;
};
export const GameAddressAndPrice: (props: Props) => JSX.Element; 