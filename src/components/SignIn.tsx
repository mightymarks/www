import { css } from 'linaria'
import { styled } from 'linaria/react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import { signIn, signOut, useAuthState } from '../firebase/auth'
import { colors, fonts, fontSizes } from '../theme'
import { tablet } from '../theme/mq'
import Button from './Button'
import GitHubIcon from './GitHubIcon'

const TRANSITION_DURATION = 200

const iconStyles = css`
	margin-left: 1ch;
`

const transitionCSS = css`
	transition: opacity ${TRANSITION_DURATION}ms;

	&.enter,
	&.appear {
		opacity: 0;
	}

	&.enter-active,
	&.appear-active {
		opacity: 1;
	}

	&.exit {
		opacity: 1;
	}

	&.exit-active {
		opacity: 0;
	}
`

const User: React.FC<Partial<CSSTransitionProps>> = styled.div`
	margin: 10vw 0 2vw;

	${tablet} {
		margin-top: 6vw;
	}
`

const SignedIn = styled.p`
	font-family: ${fonts.sans};
	font-size: ${fontSizes[1]};
	color: ${colors.grey[7]};

	em {
		font-style: normal;
		font-weight: 700;
	}

	p {
		& + p {
			margin-top: 1rem;
		}
	}
`

const Error = styled.p`
	color: ${colors.red};
`

const SignUp: React.FC = () => {
	const [user, loading, error] = useAuthState()

	if (error)
		return (
			<User>
				<Error>{error}</Error>
			</User>
		)

	return (
		!loading && (
			<User>
				<SwitchTransition>
					<CSSTransition
						className={transitionCSS}
						timeout={TRANSITION_DURATION}
						key={user ? 'hasUser' : 'noUser'}
						appear
					>
						{user ? (
							<SignedIn>
								You are signed in as <em>{user && user.email}</em>.
								<br />
								<br />
								<Button onClick={signOut} color={colors.blue} small hollow>
									Sign out
								</Button>
							</SignedIn>
						) : (
							<Button onClick={signIn} color={colors.blue}>
								Sign in with GitHub
								<GitHubIcon className={iconStyles} />
							</Button>
						)}
					</CSSTransition>
				</SwitchTransition>
			</User>
		)
	)
}

export default SignUp
