import { IMoovService, MoovService } from "./moov";
import { ISlackService, SlackService } from "./slack";

class Environment {
  MoovService: IMoovService = new MoovService();
  SlackService: ISlackService = new SlackService();
}

export let Env = new Environment();
