package station.chargeStation.business.concretes;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import station.chargeStation.business.abstracts.TokenService;
import station.chargeStation.auth.abstracts.TokenServiceAuth;
import station.chargeStation.dataAccess.abstracts.TokenRepository;
import station.chargeStation.dataAccess.abstracts.UserRepository;
import station.chargeStation.entities.concretes.Token;
import station.chargeStation.entities.concretes.User;

@Service
public class TokenManager implements TokenService{

	private UserRepository userRepository;
	private TokenServiceAuth tokenServiceAuth;
	private TokenRepository tokenRepository;
	
	@Autowired
	public TokenManager(UserRepository userRepository, TokenServiceAuth tokenServiceAuth, TokenRepository tokenRepository) {
		this.userRepository = userRepository;
		this.tokenServiceAuth = tokenServiceAuth;
		this.tokenRepository = tokenRepository;
	}
	
	@Override
	public String createToken(String userName, String password) {
		List<User> userList = userRepository.findAll();
		String token = null;
		System.out.println(userName);
		System.out.println(password);
		for(User user : userList) {
			
			System.out.println(user.getUserName());
			System.out.println(user.getPassword());
			
			if(user.getUserName().trim().equals(userName.trim()) && user.getPassword().equals(password)) {
				// BURAYA USER MI ADMIN Mİ BU KODLARI EKLERSİN
				System.out.println("Bilgiler doğru");
				token = tokenServiceAuth.generateToken(user.getId(), "user");
				
				// BURADA TOKEN KAYDETME İŞLEMLERİ OLMASI GEREKİYOR:
				
				Date now = new Date();
				Token newToken = new Token();
				newToken.setUser_id(user.getId());
				newToken.setToken(token);
				newToken.setCreated_at(now);
				newToken.setUpdated_at(now);
				newToken.setExpiry_date(now);
				
				tokenRepository.save(newToken);
				
				token = String.valueOf(user.getId());
				System.out.println(token);
						
	            break;
			}
			else{
				System.out.println("Bilgiler yanlis");
				token = "Bilgiler yanlis";
			}
		}
		return token;
	}

	@Override
	public void add(Token token) {
		tokenRepository.save(token);
	}
	
	@Override
	public int validateToken(String token) {
		List<Token> tokens = tokenRepository.findAll();
		int userId = 0;
		for(Token tokenValidate : tokens) {
			if(tokenValidate.getToken().equals(tokens)) {
			    userId = tokenValidate.getUser_id();
			}
			else{
				userId = 0;
			}
		}
		return userId;
	}

}
