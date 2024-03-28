export class ProgramMetadata {
	program_name: string;
	url: string;
	objective: string;
	program_type: string;
	organization_type: string;
	target_audience: string;
	cost: string;
	location: string | undefined;
	gender: string | undefined;
	race_ethnicity: string | undefined;
	participant_level: string;
	prerequisites: string | undefined;
	is_community_program: boolean;
	duration: string;

	constructor(props: any) {
		this.program_name = props.program_name;
		this.url = props.url;
		this.objective = props.objective;
		this.program_type = props.program_type;
		this.organization_type = props.organization_type;
		this.target_audience = props.target_audience;
		this.cost = props.cost;
		this.location = props.location;
		this.gender = props.gender;
		this.race_ethnicity = props.race_ethnicity;
		this.participant_level = props.participant_level;
		this.prerequisites = props.prerequisites;
		this.is_community_program = props.is_community_program;
		this.duration = props.duration;
	}
}
