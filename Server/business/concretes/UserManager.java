package station.chargeStation.business.concretes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import station.chargeStation.auth.abstracts.TokenServiceAuth;
import station.chargeStation.business.abstracts.UserService;
import station.chargeStation.dataAccess.abstracts.ChargeStationRepository;
import station.chargeStation.dataAccess.abstracts.UserRepository;
import station.chargeStation.entities.concretes.ChargeStation;
import station.chargeStation.entities.concretes.User;

@Service
public class UserManager implements UserService{

	private UserRepository userRepository;
	private TokenServiceAuth tokenService;
	private ChargeStationRepository stationRepository;
	
	@Autowired
	public UserManager(UserRepository userRepository, TokenServiceAuth tokenService, ChargeStationRepository stationRepository) {
		this.userRepository = userRepository;
		this.tokenService = tokenService;
		this.stationRepository = stationRepository;
	}

	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}
	
	public User findById(int userId) {
		return userRepository.findById(userId).get();
	}

	@Override
	public void update(User user, int userId) {
		User user1 = userRepository.findById(userId).get();
		user1 = user;
		user1.setId(userId);
		userRepository.save(user1);
	}

	@Override
	public void add(User user) {
		userRepository.save(user);
	}

	@Override
	public void delete(int id) {
		userRepository.deleteById(id);
	}

	@Override
	public Boolean payment(int price, String creditCart) {
		User userCredit = userRepository.findById(0).get();
		String creditCart1 = userCredit.getCreditCart();
		
		Boolean pay;
		
		if(creditCart == creditCart1) {
			pay = true;
		}
		else{
			pay = false;
		}
		return pay;
	}
	
	@Override
	public String userValidation(String userName, String password) {
		
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
				token = tokenService.generateToken(user.getId(), "user");
	            break;
			}
			else{
				System.out.println("Bilgiler yanlis");
				token = "Bilgiler yanlis";
			}
		}
		return token;
	}
	
	//********************************************WebSite********************************************
	
	@Override
	public Boolean userValidationWebSite(User user) {
		Boolean userExistence = false;
		List<User> userList = userRepository.findAll();
		for(User userNew : userList) {
			if(userNew.getUserName().equals(user.getUserName()) && userNew.getPassword().equals(user.getPassword())) {
				userExistence = true;
			}
		}
		return userExistence;
	}
	
	@Override
	public int postPriceWebSite(User user, int price) {
		
		System.out.println("kullanıcı: " + user);
		System.out.println("fiyat: " + price);
			if(user.getUserName().equals("BaskentEdas")) {
				ChargeStation chargeStation = stationRepository.findById(1).get();
				chargeStation.setPrice(price);
				System.out.println("BaskentEdas Elektrik Fiyatini Degistirdi !!");
				stationRepository.save(chargeStation);
			}
			else if(user.getUserName().equals("VAN")) {
				ChargeStation chargeStation = stationRepository.findById(2).get();
				chargeStation.setPrice(price);
				System.out.println("VAN Elektrik Fiyatini Degistirdi !!");
				stationRepository.save(chargeStation);
			}
			else if(user.getUserName().equals("GDZ")) {
				ChargeStation chargeStation = stationRepository.findById(3).get();
				chargeStation.setPrice(price);
				System.out.println("GDZ Elektrik Fiyatini Degistirdi !!");
				stationRepository.save(chargeStation);
			}
			else if(user.getUserName().equals("Ferhat")) {
				ChargeStation chargeStation = stationRepository.findById(3).get();
				chargeStation.setPrice(price);
				System.out.println("Ferhat Elektrik Fiyatini Degistirdi !!");
				stationRepository.save(chargeStation);
			}
		return price;
	}
}




















