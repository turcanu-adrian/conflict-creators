import { LoadingPhase } from "./LoadingPhase";
import { ChatAnswerPhase, chatAnswerPhaseFunction } from "./ChatAnswerPhase";
import { JoinPhase, joinPhaseFunction } from "./JoinPhase";
import { FaceOffPhase, faceOffPhaseFunction } from "./FaceOffPhase";
import { PlayerAnswerPhase, playerAnswerPhaseFunction } from "./PlayerAnswerPhase";
import {RoundEndPhase} from "./RoundEndPhase" 
import { GameEndPhase } from "./GameEndPhase";

export {LoadingPhase, JoinPhase, ChatAnswerPhase, FaceOffPhase, PlayerAnswerPhase, RoundEndPhase}
export {joinPhaseFunction, chatAnswerPhaseFunction, faceOffPhaseFunction, playerAnswerPhaseFunction, GameEndPhase}