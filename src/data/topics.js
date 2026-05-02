import wave from "./topics/wave.js";
import sound from "./topics/sound.js";
import radiation from "./topics/radiation.js";
import light from "./topics/light.js";
import mirror from "./topics/mirror.js";

export const TOPICS = [wave, sound, radiation, light, mirror];
export const TOPIC_BY_ID = Object.fromEntries(TOPICS.map(t => [t.id, t]));
