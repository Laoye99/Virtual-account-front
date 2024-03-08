import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

// ** Config
import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
//const storedToken = localStorage.getItem(authConfig.storageTokenKeyName)
//console.log('xxxxxxxxxx',storedToken)



const DefineRulesFor = (role, subject) => {
  const auth = useAuth()
  console.log('ffffffffff', auth.user.role)
  const ablData = auth.user.role



  // const ablData = auth?.abl?.map(item => item.action)

  console.log('ddddddddddddd', ablData)
  console.log('aaaaaaaaa', role)
  console.log('bbbbbbbbb', subject)
  const { can, rules } = new AbilityBuilder(AppAbility)
  can('user', 'user')


    can(`${auth.user.role}`, "ADMIN")


  // if (role === 'admin') {
  //   can('manage', 'all')
  // }else {
  //   can(ablData, "SLA")
  // }

  return rules
}

export const buildAbilityFor = (role, subject) => {
  return new AppAbility(DefineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

export default DefineRulesFor
