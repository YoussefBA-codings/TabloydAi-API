const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
import { Injectable, BadRequestException } from '@nestjs/common';
import twilio from 'twilio';

@Injectable()
export class TwilioService {
	private twilioAccount;
	private verifyService;

	constructor() {
		this.twilioAccount = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
		this.verifyService =
			this.twilioAccount.verify.v2.services(VERIFICATION_SID);
	}

	public async verifySmsOrEmailRequest(channel, to) {
		try {
			return await this.verifyService.verifications.create({
				to,
				channel,
			});
		} catch (e) {
			console.log(e);
		}
	}

	public async verifySmsOrEmailResult(verificationCode, to) {
		try {
			return await this.verifyService.verificationChecks.create({
				to,
				code: verificationCode,
			});
		} catch (e) {
			throw new BadRequestException(e);
		}
	}
}
