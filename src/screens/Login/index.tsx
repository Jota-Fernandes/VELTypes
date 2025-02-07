import { useState, useContext, useEffect } from 'react';
import { getRealm } from 'src/database/realm';

import { Text, Pressable, Alert, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

import bg_image from '@assets/bg_evolucao.jpg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';

import { useNavigation } from '@react-navigation/native';

import '../../services/i18next'

import { useTranslation } from 'react-i18next';

import { Container, Logo, Form, SubForm, LanguageContainer, LanguageTitle } from './styles';

export default function Login() {
  const { t, i18n } = useTranslation();

  const [hidepassword, setHidePassword] = useState(true);
  const {setUser, handleLogin, signed} = useContext(AuthContext)
  const [userForm, setUserForm] = useState({
    login: '',
    password: '',
    replica: ''
  })

  const navigation = useNavigation();

  const [currentLanguage, setLanguage] = useState('ptbr');

  const changeLanguage = (value : string) => {
    i18n
    .changeLanguage(value)
    .then(() => setLanguage(value))
    .catch(err => console.log(err));
  }

  async function postLogin(){
    if(userForm.login && userForm.password && userForm.replica){
          try{

            handleLogin(userForm.login, userForm.password, userForm.replica)
            
          } catch(error){
              console.log('Login Container - Erro:', error)
              switch(error){
                case 404:
                    Alert.alert('Réplica inexistente', 'A réplica informada não existe')
                    break;
                case 401:
                    Alert.alert('Credenciais incorretas', 'Login ou senha incorretos!')
                    break;
                case "UserAlreadyIn":
                    Alert.alert('Usuário logado', 'Este usuário já está autenticado no aparelho!')
                    break;
                default:
                    Alert.alert('Erro inesperado', 'Ocorreu um erro inesperado, entre em contato com o suporte!')
                    break;
            }
          }
      } else {
          Alert.alert(
              "Dados de Login",
              "Preencha os campos"
          )
      }
  }

  const handleChange = (name: any) => (value: any) => {
    if (name === "login" || name === "replica") {
        value = value.normalize('NFD').replace(/([\u0300-\u036f])/g, '').toLowerCase();
    }
    setUserForm(prevUser => ({ ...prevUser, [name]: value }));
  }

   async function fetchUsers() {
          const realm = await getRealm()
  
          try{
              if(!realm.isClosed){
                  const response = realm.objects('Auth')
                  console.log('response:', Array.from(response))
  
                  if (response.length > 0) {
                      const firstUser = response[0]; // Pegando o primeiro usuário
                      setUser({
                          id: String(firstUser._id),  // Garantindo que seja string
                          login: String(firstUser.login),
                          password: String(firstUser.password),
                          token: firstUser.token ? String(firstUser.token) : "",
                          replica: String(firstUser.replica),
                          sistema: String(firstUser.sistema),
                      });
  
                      navigation.navigate('Servicos');
                  }
              } else {
                  console.error("Erro: A instância do Realm está fechada.");
  
              }
              
          } catch(error){
              console.error('fetchUsers', error)
          }
      }

  useEffect(() => {
    fetchUsers()
  }, [signed]);

  return (
    <Container>
    <ScrollView>
      <Logo source={bg_image}/>
      <Form>
        <SubForm>
          <Input 
            placeholder="Login" 
            defaultValue={userForm.login}
            onChangeText={handleChange('login')}
          />
        </SubForm>

        <SubForm>
          <Input 
            placeholder={t('senha')}
            secureTextEntry={hidepassword}
            defaultValue={userForm.password}
            onChangeText={handleChange('password')}
          />
          <ButtonIcon 
            icon={hidepassword ? "visibility" : "visibility-off"  }
            onPress={() => setHidePassword(!hidepassword)}
            />
        </SubForm>

        <SubForm>
          <Input 
            placeholder="Réplica" 
            autocapitalize="none"
            defaultValue={userForm.replica}
            onChangeText={handleChange('replica')}
          />
        </SubForm>
        
        <Button 
          title="Entrar"
          onPress={postLogin}
        />
      </Form>

      <LanguageContainer>
        <LanguageTitle style={{marginBottom: 10}}>
          Selecione o idioma / Seleccionar idioma
        </LanguageTitle>
      </LanguageContainer>

      <LanguageContainer>
        <Pressable
          onPress={() => changeLanguage('ptbr')}
          style={{
            backgroundColor:
              currentLanguage === 'ptbr' ? '#3A797A' : '#d3d3d3',
            padding: 20,
          }}>
          <Text 
            style={{
              color:
                currentLanguage === 'ptbr' ? '#ffffff' : '#000000',
            }}
          >
              Português
          </Text>
        </Pressable>
        <Pressable
          onPress={() => changeLanguage('es')}
          style={{
            backgroundColor:
              currentLanguage === 'es' ? '#3A797A' : '#d3d3d3',
            padding: 20,
          }}>
          <Text 
            style={{
              color:
                currentLanguage === 'es' ? '#ffffff' : '#000000',
          
            }}
          >
              Español
          </Text>
        </Pressable>
      </LanguageContainer>
      </ScrollView>
    </Container>
  );
}