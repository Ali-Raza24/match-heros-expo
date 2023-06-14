export const formatGame = (data) => {
    let _game = {};
    _game.id = data.id;
    _game.game_type = data.game_type;
    _game.game_size = data.game_size;
    _game.creator_id = data.creator_id;
    _game.creator_id = data.creator_id;
    _game.booking_id = data.booking_id;
    _game.tournament_id = data.tournament_id;
    _game.status = data.status;
    _game.avg_game_players = data.avg_game_players;
    _game.match_duration = data.match_duration;
    _game.game_speed = data.game_speed;
    _game.game_fee = data.game_fee;
    _game.game_method = data.game_method;
    _game.fee_type = data.fee_type;
    _game.game_repeat = data.game_repeat;
    _game.created_at = data.created_at;
    _game.updated_at = data.updated_at;
    _game.block_booking_id = data.block_booking_id;
    _game.starts_at = data.starts_at;
    _game.venue_id = data.venue_id;
    _game.teams = data.teams;
    return _game
}