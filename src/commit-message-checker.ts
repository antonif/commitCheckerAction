/*
 * This file is part of the "GS Commit Message Checker" Action for Github.
 *
 * Copyright (C) 2019 by Gilbertsoft LLC (gilbertsoft.org)
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * For the full license information, please read the LICENSE file that
 * was distributed with this source code.
 */

/**
 * Imports
 */
import * as core from '@actions/core'
import * as github from '@actions/github'
import {ICheckerArguments} from './input-helper'

/**
 * Interface used as arguments for the check function containing the pattern,
 * error message and the messages.
 */

/**
 * Checks commit messages given by args.
 *
 * @param     args messages, pattern and error message to process.
 * @returns   void
 */
export async function checkCommitMessages(
  args: ICheckerArguments
): Promise<void> {
  const messageRegex = new RegExp(args.pattern, args.flags)
  // Check arguments
  if (args.pattern.length === 0) {
    throw new Error(`PATTERN not defined.`)
  }
  if (args.pattern.length === 0) {
    throw new Error(`PATTERN not defined.`)
  }

  const regex = new RegExp('[^gimsuy]', 'g')
  let invalidChars
  let chars = ''
  while ((invalidChars = regex.exec(args.flags)) !== null) {
    chars += invalidChars[0]
  }
  if (chars !== '') {
    throw new Error(`FLAGS contains invalid characters "${chars}".`)
  }

  if (args.error.length === 0) {
    throw new Error(`ERROR not defined.`)
  }

  if (args.lists.messages.length === 0) {
    throw new Error(`MESSAGES tag is not defined.`)
  }

  // Check messages
  let result = true

  core.info(`Checking commit messages against "${args.pattern}"...`)

  for (const message of args.lists.messages) {
    if (messageRegex.test(message)) {
      core.info(`- OK: "${message}"`)
    } else {
      core.info(`- failed: "${message}"`)
      result = false
    }
  }

  // Throw error in case of failed test
  if (!result) {
    throw args.error
  }
}

/**
 * Checks the message against the regex pattern.
 *
 * @param     message message to check against the pattern.
 * @param     pattern regex pattern for the check.
 * @returns   boolean
 */