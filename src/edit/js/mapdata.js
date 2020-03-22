var simplemaps_canadamap_mapdata={
  main_settings: {
    //General settings
		width: 'responsive',//'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    popups: "detect",
    
		//State defaults
		state_description: "Description",
    state_color: "rgba(2,117,216,1)",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,
    border_color: "#ffffff",
    all_states_inactive: "no",
    all_states_zoomable: "no",
    
		//Location defaults
		location_description: "Location description",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
		//Label defaults
		label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 22,
    label_font: "Arial",
    hide_labels: "no",
   
		//Zoom settings
		manual_zoom: "no",
    back_image: "no",
    arrow_box: "no",
    navigation_size: "40",
    navigation_color: "#f7f7f7",
    navigation_border_color: "#636363",
    initial_back: "no",
    initial_zoom: -1,
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
		//Popup settings
		popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
		//Advanced settings
		div: "map",
    auto_load: "yes",
    rotate: "0",
    images_directory: "default",
    import_labels: "no",
    fade_time: 0.1
  },
  state_specific: {
    AB: {
      name: "Alberta",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    BC: {
      name: "British Columbia",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    SK: {
      name: "Saskatchewan",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    MB: {
      name: "Manitoba",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    ON: {
      name: "Ontario",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    QC: {
      name: "Quebec",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    NB: {
      name: "New Brunswick",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    PE: {
      name: "Prince Edward Island",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    NS: {
      name: "Nova Scotia",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    NL: {
      name: "Newfoundland",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    NU: {
      name: "Nunavut",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    NT: {
      name: "Northwest Territories",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    },
    YT: {
      name: "Yukon",
      description: "0 Cases",
      color: "default",
      hover_color: "default",
      url: "default"
    }
  },
  locations: {
    // "0": {
    //   name: "Toronto",
    //   lat: 43.653226,
    //   lng: -79.3831843,
    //   color: "default"
    // },
    // "1": {
    //   name: "Halifax",
    //   lat: 44.6488625,
    //   lng: -63.5753196,
    //   color: "default"
    // }
  },
  labels: {
    PE: {
      x: 960,
      y: 814,
      parent_id: "PE",
      pill: "yes",
      width: 65,
      display: "all"
    },
    NS: {
      x: 960,
      y: 854,
      parent_id: "NS",
      pill: "yes",
      width: 65,
      display: "all"
    },
    AB: {
      x: 232,
      y: 657,
      parent_id: "AB"
    },
    BC: {
      x: 117,
      y: 635,
      parent_id: "BC"
    },
    YT: {
      x: 75,
      y: 440,
      parent_id: "YT"
    },
    NT: {
      x: 225,
      y: 471,
      parent_id: "NT"
    },
    NU: {
      x: 429,
      y: 478,
      parent_id: "NU"
    },
    SK: {
      x: 332,
      y: 670,
      parent_id: "SK"
    },
    MB: {
      x: 430,
      y: 675,
      parent_id: "MB"
    },
    NL: {
      x: 840,
      y: 643,
      parent_id: "NL"
    },
    NB: {
      x: 837,
      y: 798,
      parent_id: "NB"
    },
    ON: {
      x: 552,
      y: 747,
      parent_id: "ON"
    },
    QC: {
      x: 718,
      y: 704,
      parent_id: "QC"
    }
  }
};