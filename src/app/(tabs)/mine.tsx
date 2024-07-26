/**
 * @name Mine
 * @description 我的（tab）
 * @author darcrand
 */

import { TOKEN_KEY } from '@/constants/common'
import { useProfile, USER_PROFILE_KEY } from '@/queries/useProfile'
import { favoriteService } from '@/services/favorite'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { Button, Text, View } from 'react-native'

export default function Mine() {
  const queryClient = useQueryClient()
  const profileRes = useProfile()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await AsyncStorage.removeItem(TOKEN_KEY)
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY })
    },
  })

  const isLoggedIn = profileRes.isSuccess && !!profileRes.data?.id

  const { data: allFavorites } = useQuery({
    enabled: isLoggedIn,
    queryKey: ['favorite', 'all'],
    queryFn: () => favoriteService.all(),
  })

  return (
    <>
      <View>
        <Text>Mine</Text>

        {isLoggedIn ? (
          <View>
            <Text>{profileRes.data?.name}</Text>
            <Button title='logout' onPress={() => logoutMutation.mutate()}></Button>

            <View>
              <Text>My favorite posts</Text>

              <View className='m-4 space-y-4'>
                {allFavorites?.map((v) => (
                  <Link key={v.id} href={`/favorite/${v.id}`}>
                    {v.name}
                  </Link>
                ))}
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Link href='/login-modal'>login first</Link>
          </View>
        )}
      </View>
    </>
  )
}
