export const validateField = (values) => {
  const errors = {};
  return () => {
    const {
      game_type,
      game_size,
      starts_at,
      match_duration,
      game_speed, //optional
      avg_game_players, // optional
      game_fee,
      fee_type,
      game_repeat,
      surface_type,
      venue_name,
      county,
      area,
    } = values;
    if (!game_type || game_type.length === 0) {
      errors.game_type = "Game type is Required!";
    }
    if (!game_size || game_size.length === 0) {
      errors.game_size = "Game size is Required!";
    }
    if (!starts_at) {
      errors.starts_at = "Please choose the game start date.";
    }
    if (!match_duration) {
      errors.match_duration = "Match duration is Required!";
    }
    if (!game_fee || game_fee.length < 0) {
      if (typeof game_fee !== "number") {
        errors.game_fee = "Game fee should be a number";
      }
      errors.game_fee = "Game fee is Required!";
    }
    if (!fee_type && fee_type.length < 1) {
      errors.fee_type = "Choose the Payment method.";
    }

    if (venue_name && (!county || !area)) {
      errors.countyAndArea = "County and Area are required.";
    }

    if (venue_name) {
      if ((venue_name && !surface_type) || surface_type.length < 1) {
        if (county && !surface_type) {
          errors.surface_type = "Please choose Surface Type.";
        }
        if (area && !surface_type) {
          errors.surface_type = "Please choose Surface Type.";
        }
        errors.surface_type = "Please choose Surface Type.";
      }

      if ((surface_type && !venue_name) || venue_name.length < 1) {
        if (county && !venue_name) {
          errors.venue_name = "Venue name is required.";
        }
        if (area && !venue_name) {
          errors.venue_name = "Venue name is required.";
        }
        errors.venue_name = "Venue name is required.";
      }
    }

    return errors;
  };
};
