import * as core from '@actions/core'
import * as github from '@actions/github'
import {ICheckerArguments} from './input-helper'

export async function checkCommitAuthorEmail(
  args: ICheckerArguments
): Promise<void> {
    if(github.context.eventName != 'pull_request') {
        const regex = new RegExp(args.emailPattern, args.flags)
        const errorList = Array<string>();
        for (let email of args.lists.emailAddresses) {
            if (regex.test(email) != true) {
                args.errorMessages.push(`Wrong email address: "${email}"`)
            }
        }
    }
    else {
        //pass
    }
}