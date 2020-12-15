import * as core from '@actions/core'
import * as github from '@actions/github'
import {ICheckerArguments} from './input-helper'

export async function checkCommitAuthorEmail(
  args: ICheckerArguments
): Promise<void> {
    const regex = new RegExp(args.emailPattern, args.flags)
    const errorList = Array<string>();
    for (let email of args.lists.emailAddresses) {
        if (regex.test(email) != true) {
            errorList.push(`Wrong email address: "${email}"`)
        }
        core.info(`Author email address is: "${email}"`)
    }
    args.errorMessages = errorList
}