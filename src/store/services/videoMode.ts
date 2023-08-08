// create a redux slice with a videoMode property

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VideoModeState {
    enabled: boolean;
}

const initialState: VideoModeState = {
    enabled: true
};

export const videoModeSlice = createSlice({
    name: 'videoMode',
    initialState,
    reducers: {
        setVideoModeEnabled: (state, action: PayloadAction<VideoModeState>) => {
            state.enabled = action.payload.enabled;
        }
    }
});

export const { setVideoModeEnabled } = videoModeSlice.actions;
export default videoModeSlice.reducer;
