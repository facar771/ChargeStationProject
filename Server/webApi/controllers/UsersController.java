package station.chargeStation.webApi.controllers;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import station.chargeStation.business.abstracts.UserService;
import station.chargeStation.entities.concretes.User;

@RestController
@RequestMapping("/api/users")
public class UsersController {
	
	private UserService userService;

	@Autowired
	public UsersController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/getall")
	public List<User> getAll(){
		System.out.println("BasariliSefa");
		return userService.getAll();
	}
	
	@GetMapping("/getKw")
	public List<User> getKw(){
		System.out.println("BasariliSefa");
		return userService.getAll();
	}
	
	@PostMapping("/postName")
	public String handleRequest(@RequestBody Map<String, Object> requestData) {
	    String dataValue = (String) requestData.get("dataKey");
	    System.out.println("Gonderilen veri: " + dataValue);
	    
	    String response = "İşlem başarılı (SUNUCU)";
	    return response;
	}
	
	@PostMapping("/postUser")
    public String postUser(@RequestBody User user) {
        String kw = user.getPhonenumber();
        System.out.printf("Kw Deger: ");
        System.out.printf(kw);
        System.out.println("");
        String response = "İşlem başarılı (SUNUCU)";
        return response;
    }
	@PostMapping("/postUserUpdate")
	public String postUserUpdate(@RequestBody User user, int id) {
		userService.update(user, id);
		String response = "İşlem başarılı (SUNUCU)";
        return response;
	}
	
	public Boolean postCreditCart(@RequestBody Map<String, Object> requestData) {
		int price = (int) requestData.get("price");
		String creditCart = (String) requestData.get("creditCart");
		return userService.payment(price, creditCart);
	}
	
	@PostMapping("/postUserValidation")
	public String userValidation(@RequestBody User user) {
		Date now = new Date();
		System.out.println("Şu anki tarih ve saat: " + now + " Giren Kisi: " + user.getUserName());
        return userService.userValidation(user.getUserName(), user.getPassword());
	}
	
	//********************************************WebSite********************************************
	
	@PostMapping("/postUserWebSite")
	@CrossOrigin(origins = "http://www.benimsarjim.com")
	public Boolean postUserWebSite(@RequestBody User user) {	
		System.out.println("siteden giriş yapılmaya calisiliyor.");
		return userService.userValidationWebSite(user);
	}
	
	@PostMapping("/postPriceWebSite")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public int postPriceWebSite(@RequestBody User user, @RequestParam("price") int price) {
		System.out.println("Fiyat Geldi");
		System.out.println(user.getUserName());
		System.out.println(price);
		return userService.postPriceWebSite(user, price);
	}
}







