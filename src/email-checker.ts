import * as core from '@actions/core'
import * as github from '@actions/github'
import {ICheckerArguments} from './input-helper'

export async function checkCommitAuthorEmail(
  args: ICheckerArguments
): Promise<void> {
    const regex = new RegExp(args.emailPattern, args.flags)
    for (let email of args.lists.emailAddresses) {
        if (regex.test(email) != true) {
            core.info(`Your email address is: "${email}"`)
            core.info('Incorrect email address!')
            args.errorMessages.push(email)
        }
        core.info(`Author email address is: "${email}"`)
    }
}