export type IVenue = {
    address: null | string;
    allow_reservation: number;
    area: string;
    city: null | string;
    city_id: null | string;
    coordinates: null | object;
    county: string;
    created_at: string;
    custom_venue: 1 | 0;
    deleted_at: null | string;
    description: null | string;
    email: null | string;
    id: number;
    image: null | string;
    name: string;
    phone: null | string;
    surface_type: string;
    terms: null;
    updated_at: string;
    user_id: number;
    working_hours: number | string;
}

export type IPitch = {
    created_at: string;
    deleted_at: null | string;
    details: null | string;
    id: number;
    name: string;
    size: null;
    updated_at: string;
    venue_id: number;
    venue: null | IVenue
}

export type IBooking = {
    block_booking_id: null | number;
    created_at: "2022-05-31 07:23:57";
    description: null | string;
    game_id: number;
    id: number;
    interval: number;
    pitch: null | IPitch;
}

export interface IGame {
    id: number;
    game_type: string | null;
    creator_id: number;
    tournament_id: null | number;
    booking_id: null | number;
    status: null | string;
    game_size: string | undefined;
    avg_game_players: string;
    match_duration: number;
    game_speed: string;
    game_fee: string;
    fee_type: string[];
    fee_method: string[];
    game_repeat: number;
    created_at: string;
    updated_at: string;
    block_booking_id: null | number;
    starts_at: string;
    venue_id: null | IVenue;
    teams: [];
    booking: null | IBooking;
    conversation: {
        id: number;
        name: string;
        conversationable_id: number;
        conversationable_type: string;
        created_at: string;
        updated_at: string;
        messages: Array<any>;
    }
}